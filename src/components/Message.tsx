import { FaCheckDouble } from "react-icons/fa";
import '../App.css';

const Message = ({ text, user, avatar, timestamp, read, isCurrentUser }: any) => {
  // Format timestamp to "HH:MM" (24-hour format)
  const formattedTime = timestamp
    ? new Date(timestamp.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
    : "";

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} my-2`}>
      <div className={"flex items-start space-x-3 p-3 rounded-xl shadow-md max-w-xs"}>
        {!isCurrentUser && avatar && (
          <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
        )}

        <div>
          {!isCurrentUser && <p className="font-semibold">{user}</p>}
          <p className="text-sm">{text}</p>
          <div className="flex items-center justify-between text-xs">
            <span>{formattedTime}</span>
            {isCurrentUser && read && <FaCheckDouble className="text-blue-300" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
