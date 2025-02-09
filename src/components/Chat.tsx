import { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { FaPaperPlane, FaMoon, FaSun, FaReply, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useSound from "use-sound";
import sendSound from "../assets/send.mp3";
import Message from "./Message";

// Define Message type
interface MessageType {
  id: string;
  text: string;
  user: string;
  avatar: string;
  timestamp?: any;
  read: boolean;
  reactions?: { [userId: string]: string };
  replyTo?: MessageType | null;
}

// Emoji Reactions
const emojiList = ["😂", "❤️", "🔥", "😎", "👍", "🎉"];

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [text, setText] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" // Load preference
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [replyingTo, setReplyingTo] = useState<MessageType | null>(null);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [playSend] = useSound(sendSound);

  // Fetch Messages from Firestore
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MessageType[]
      );
    });

    return () => unsubscribe();
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode)); // Save preference
  }, [darkMode]);

  // Handle Sending Message
  const sendMessage = async () => {
    if (!text.trim()) return;

    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "messages"), {
      text,
      user: user.displayName || "Anonymous",
      avatar: user.photoURL || "",
      timestamp: serverTimestamp(),
      read: false,
      reactions: {},
      replyTo: replyingTo ? { ...replyingTo } : null, // Save the reply reference
    });

    setText("");
    setReplyingTo(null);
    playSend();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // ✅ Add Reaction and Update Firestore
  const addReaction = async (msgId: string, emoji: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const messageRef = doc(db, "messages", msgId);
    const message = messages.find((msg) => msg.id === msgId);
    if (!message) return;

    const updatedReactions = { ...(message.reactions || {}) };
    updatedReactions[user.uid] = emoji;

    await updateDoc(messageRef, { reactions: updatedReactions });
  };

  return (
    <div className={`h-screen flex flex-col transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-black"}`}>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Header */}
      <motion.div className={`p-4 shadow-md fixed w-full top-0 flex justify-between items-center px-6 ${darkMode ? "bg-gray-800" : "bg-white"}`} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-xl font-semibold">Chat App</h1>
        <motion.button onClick={() => setDarkMode(!darkMode)} className="text-lg" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
        </motion.button>
      </motion.div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-6 mt-16 mb-16 space-y-4`}>
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="group relative">
            {/* Display Reply If Exists */}
            {msg.replyTo && (
              <div className="mb-2 p-2 bg-gray-700 text-sm rounded-md">
                <span className="font-semibold">{msg.replyTo.user}:</span> {msg.replyTo.text}
              </div>
            )}

            {/* Message Component */}
            <Message {...msg} />

            {/* Reply & React Buttons */}
            <div className="absolute -top-6 right-4 flex space-x-2 bg-gray-700 text-white p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition duration-300">
              <button className="text-xl" onClick={() => setReplyingTo(msg)}>
                <FaReply />
              </button>

              {/* Reaction Button */}
              <div className="relative">
                <button className="text-xl" onClick={() => setShowReactions(showReactions === msg.id ? null : msg.id)}>
                  <FaSmile />
                </button>

                {showReactions === msg.id && (
                  <div className="absolute -top-12 -right-6 bg-gray-800 p-2 rounded-lg shadow-md flex space-x-2">
                    {emojiList.map((emoji) => (
                      <button key={emoji} className="text-lg" onClick={() => addReaction(msg.id, emoji)}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Show Selected Reactions */}
            {msg.reactions && Object.values(msg.reactions).length > 0 && (
              <p className="text-sm mt-1 text-gray-400">
                {Object.values(msg.reactions).join(" ")}
              </p>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <motion.div className={`p-4 shadow-md flex items-center ${darkMode ? "bg-gray-900" : "bg-white"} fixed bottom-0 w-full`}>
        <motion.input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`flex-1 p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "text-white" : "text-gray-900"} transition`}
          placeholder="Type a message..."
          whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
        />
        <motion.button onClick={sendMessage} className="ml-3 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-lg" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <FaPaperPlane className="text-lg" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Chat;
