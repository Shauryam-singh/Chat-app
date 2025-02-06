import { useEffect, useState, useRef } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import Message from "./Message";
import { FaPaperPlane, FaMoon, FaSun } from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default mode is dark
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, "messages"), {
      text,
      user: auth.currentUser?.displayName,
      avatar: auth.currentUser?.photoURL,
      timestamp: serverTimestamp(),
      read: false, // New feature: Read receipts
    });
    setText("");
  };

  return (
    <div className={`h-screen flex flex-col transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-100 to-blue-300"}`}>
      {/* Header */}
      <div className={`p-4 bg-opacity-90 shadow-md text-center fixed w-full top-0 flex justify-between items-center px-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h1 className="text-xl font-semibold">Chat App</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="text-lg">
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 mt-16 space-y-4">
        {messages.map((msg) => (
          <Message key={msg.id} {...msg} darkMode={darkMode} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {typing && <p className="text-center text-sm text-gray-500">Someone is typing...</p>}

      {/* Message Input */}
      <div className={`p-4 shadow-md flex items-center fixed bottom-0 w-full ${darkMode ? "bg-gray-800" : "bg-white bg-opacity-90"}`}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setTyping(true);
            setTimeout(() => setTyping(false), 1000);
          }}
          className="flex-1 p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-3 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-lg"
        >
          <FaPaperPlane className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
