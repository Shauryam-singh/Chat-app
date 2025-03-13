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
import { FaPaperPlane, FaLock, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useSound from "use-sound";
import sendSound from "../assets/send.mp3";
import Message from "./Message";
import '../App.css'

const ROOM_KEY = "SECRET123";

interface MessageType {
  id: string;
  text: string;
  user: string;
  avatar: string;
  timestamp?: any;
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [text, setText] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [enteredKey, setEnteredKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode") || "false")
  );  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [playSend] = useSound(sendSound);

  // ✅ Apply Dark Mode on Mount
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  
  // Fetch Messages from Firestore
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

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    });

    setText("");
    playSend();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // ✅ Handle Key Submission
  const handleKeySubmit = () => {
    if (enteredKey === ROOM_KEY) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect Room Key! Try Again.");
    }
  };

  // ✅ Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode)); // Ensure proper boolean storage
      return newMode;
    });
  };

  // ✅ If User Hasn't Entered Correct Key → Show Key Input
  if (!isAuthenticated) {
    return (
      <div className="auth-box h-screen flex flex-col justify-center items-center">
        <div className="p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-semibold mb-4">
            Enter Room Key
          </h1>
          <p className="mb-4">
            You need a secret key to access the chat.
          </p>
          <input
            type="password"
            value={enteredKey}
            onChange={(e) => setEnteredKey(e.target.value)}
            className="w-full p-2 border rounded-md text-center"
            placeholder="Enter Secret Key"
          />
          <button
            onClick={handleKeySubmit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            <FaLock className="inline-block mr-2" />
            Enter Room
          </button>
        </div>
      </div>
    );
  }

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
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Message {...msg} />
          </motion.div>
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
