import { FaCheckDouble } from "react-icons/fa";
import "../App.css";

// Function to detect and format links in text
const formatMessageText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-700"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};

const Message = ({ text, user, avatar, timestamp, read, isCurrentUser }: any) => {
  // Format timestamp to "HH:MM" (24-hour format)
  const formattedTime = timestamp?.seconds
    ? new Date(timestamp.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
    : "";

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} my-2`}>
      <div className="flex items-start space-x-3 p-3 rounded-xl shadow-md max-w-xs bg-white dark:bg-gray-800">
        {!isCurrentUser && avatar && (
          <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
        )}

        <div>
          {!isCurrentUser && <p className="font-semibold text-gray-900 dark:text-gray-200">{user}</p>}
          <p className="text-sm text-gray-800 dark:text-gray-300">{formatMessageText(text)}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{formattedTime}</span>
            {isCurrentUser && read && <FaCheckDouble className="text-blue-300" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
