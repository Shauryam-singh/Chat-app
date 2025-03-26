import { useEffect, useState, useRef, useCallback } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { FaPaperPlane, FaLock, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useSound from "use-sound";
import sendSound from "../assets/send.mp3";
import Message from "./Message";
import "../App.css";

const ROOM_KEY = import.meta.env.VITE_CHAT_SECRET_ID;

interface MessageType {
  id: string;
  text: string;
  user: string;
  avatar: string;
  timestamp?: any;
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [text, setText] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [enteredKey, setEnteredKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("darkMode") || "false");
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [playSend] = useSound(sendSound);

  // ✅ Apply Dark Mode on Mount
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ✅ Fetch Messages from Firestore
  useEffect(() => {
    if (!isAuthenticated) return;

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
  }, [isAuthenticated]);

  // ✅ Scroll to Bottom when New Messages Arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Handle Sending Message
  const sendMessage = useCallback(async () => {
    if (!text.trim()) return;
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "messages"), {
      text,
      user: user.displayName || "Anonymous",
      avatar: user.photoURL || "",
      timestamp: serverTimestamp(),
    });

    setText("");
    playSend();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  }, [text, playSend]);

  // ✅ Handle Key Submission
  const handleKeySubmit = useCallback(() => {
    if (enteredKey.trim() === ROOM_KEY) {
      setIsAuthenticated(true);
    } else {
      alert("❌ Incorrect Room Key! Please try again.");
      setEnteredKey(""); // Clear input after incorrect attempt
    }
  }, [enteredKey]);

  // ✅ Toggle Dark Mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", JSON.stringify(!prev));
      return !prev;
    });
  }, []);

  // ✅ Secret Key Authentication Page
  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl text-center w-96 transform transition-all duration-500 hover:scale-105"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            🔐 Enter Secret Key
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mb-6">
            You need a secret key to access the chat room.
          </p>

          <input
            type="password"
            value={enteredKey}
            onChange={(e) => setEnteredKey(e.target.value)}
            className="w-full p-3 border rounded-xl text-center text-gray-700 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter Secret Key"
          />

          <button
            onClick={handleKeySubmit}
            className="mt-4 px-4 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition duration-300 w-full flex items-center justify-center gap-2"
          >
            <FaLock className="text-lg" />
            Enter Room
          </button>
        </motion.div>
      </div>
    );
  }

  // ✅ Group Messages by Date
  const groupedMessages: { [date: string]: MessageType[] } = {};
  messages.forEach((msg) => {
    const date = new Date(msg.timestamp?.seconds * 1000)
      .toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(msg);
  });

  return (
    <div className="main h-screen flex flex-col">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* ✅ Header with Dark Mode Toggle */}
      <header className="p-4 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-semibold">Chat Room</h1>
        <button onClick={toggleDarkMode} className="text-2xl">
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
      </header>

      {/* Messages */}
      <div className="chat-container flex-1 overflow-y-auto p-6 mb-16 space-y-4">
        {Object.keys(groupedMessages).map((date) => (
          <div key={date}>
            <div className="text-center text-gray-500 font-semibold my-4">{date}</div>
            {groupedMessages[date].map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Message {...msg} />
              </motion.div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <motion.div className="message-input p-4 shadow-md flex items-center fixed bottom-0 w-full">
        <motion.input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Type a message..."
        />
        <motion.button
          onClick={sendMessage}
          className="ml-3 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-lg"
        >
          <FaPaperPlane className="text-lg" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Chat;
