import { io } from "socket.io-client";
import { useState, useEffect, useRef, useContext } from "react";
import NavBar from "../NavBar";
import { Translations } from "../../translations/translations";
import { Context } from "../../context/Context";
import { useTranslate } from "../../hooks/useTranslate";

const socket = io("http://localhost:3000");


const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState(localStorage.userName);
  const chatRef = useRef(null);
  const context = useContext(Context);
  const translations = useTranslate(Translations(context));
  const themeBackground = context.clearTheme ? "bg-black-100" : "bg-[#333333]";
  const textColor = context.clearTheme ? "600" : "100"
  const navbarHoverButtonBackground = context.clearTheme ? "hover:bg-[#ffffff]" : "hover:bg-gray-300 hover:text-black-600" ;

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };

    setMessages([...messages, newMessage]);
    socket.emit("message", message);
    setMessage("");
    
  };

  useEffect(() => {
    socket.on("message", reciveMessage);
    return () => {
      socket.off("message", reciveMessage);
    };
  }, []);

  const reciveMessage = (message) => {
    message.from = userName
    setMessages((state) => [...state, message]);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <NavBar />
      <div className={`${themeBackground} h-screen mt-14 flex flex-col justify-end items-center p-4 md:w-1/3 md:fixed md:right-0 pb-16  md:border-l-4 md:border-black-100`}>
        <ul ref={chatRef} className="flex-grow w-full overflow-y-scroll">
          {messages.map((message, i) => (
            <li
              key={message + i}
              className={`${
                message.from == "Me" ? "bg-black-100 ml-auto" : "bg-blue-400"
              } my-2 p-2 table rounded-md`}
            >
              <span className="font-semibold underline block">
                {message.from}:
              </span>
              {message.body}
            </li>
          ))}
        </ul>
        <form
          onSubmit={handleSubmit}
          className=" flex md:items-center md:justify-center w-full m-auto p-0 text-center"
        >
          <input
            type="text"
            className="border w-full md:w-11/12 lg:w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#25fc98]"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={handleChange}
          />
          <button className=" px-4 py-2 bg-[#25fc98] text-white rounded-lg shadow-md hover:bg-[#15b575] focus:outline-none focus:ring-2 focus:ring-blue-400">
            {translations.send}
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
