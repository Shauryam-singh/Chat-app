import { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import Message from "./Message";
import { FaPaperPlane, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion"; // ✨ Import Framer Motion
import { User } from "firebase/auth";

// Define Message type
interface MessageType {
  id: string;
  text: string;
  user: string;
  avatar: string;
  timestamp?: any;
  read: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [text, setText] = useState<string>("");
  const [typing, setTyping] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to Dark Mode
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Typing Animation
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
    }, 1500); // Reset typing status after 1.5 seconds
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const user: User | null = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "messages"), {
      text,
      user: user.displayName || "Anonymous",
      avatar: user.photoURL || "",
      timestamp: serverTimestamp(),
      read: false, // New feature: Read receipts
    });

    setText("");
  };

  return (
    <div
      className={`h-screen flex flex-col transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-100 to-blue-300"
      }`}
    >
      {/* Header with Dark Mode Toggle */}
      <motion.div
        className={`p-4 bg-opacity-90 shadow-md text-center fixed w-full top-0 flex justify-between items-center px-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl font-semibold">Chat App</h1>
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className="text-lg"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-600" />
          )}
        </motion.button>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 mt-16 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Message {...msg} darkMode={darkMode} />
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Animation */}
      {typing && (
        <motion.div
          className="text-center text-sm text-gray-500 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <span className="animate-pulse">Typing</span>
          <span className="dot1">.</span>
          <span className="dot2">.</span>
          <span className="dot3">.</span>
        </motion.div>
      )}

      {/* Message Input */}
      <motion.div
        className={`p-4 shadow-md flex items-center fixed bottom-0 w-full ${
          darkMode ? "bg-gray-800" : "bg-white bg-opacity-90"
        }`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.input
          type="text"
          value={text}
          onChange={handleTyping}
          className="flex-1 p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Type a message..."
          whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
        />
        <motion.button
          onClick={sendMessage}
          className="ml-3 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-lg"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaPaperPlane className="text-lg" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Chat;
