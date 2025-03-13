import { FaCheckDouble } from "react-icons/fa";

const Message = ({ text, user, avatar, timestamp, read, darkMode }: any) => {
  return (
    <div className={`flex items-start ${user === "You" ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-center space-x-3 p-3 rounded-xl shadow-md max-w-xs ${darkMode ? "bg-gray-700 text-white" : "bg-white"}`}>
        {avatar && <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />}
        <div>
          <p className="font-semibold">{user}</p>
          <p className="text-sm">{text}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{new Date(timestamp?.seconds * 1000).toLocaleTimeString()}</span>
            {read && <FaCheckDouble className="text-blue-500" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
