import React, { useEffect, useState } from "react";
import { ApiService, Message } from "../api/firebase";


export const ChatPage = () => {
  const username = localStorage.getItem("username") as string;
  const channel = location.pathname

  const randomId = function(length = 8) {
    return Math.random().toString(36).substring(2, length+2);
  };

  if(channel === "/") {
    location.replace(`${location.href}${randomId()}`)
  }

  const api = ApiService(channel, username)
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api.createMessage(inputValue)
    setInputValue("");
  };

  const sync = (snapshot: any) => {
    const messageArray = []
    for(const key in snapshot) {
      messageArray.push(snapshot[key])
    }
    setMessages(messageArray)
  }

  useEffect(() => {
    api.connectToChannel(sync)
    
    console.log("channel", channel)
  }, [])

  return (
    <div className={`h-screen w-screen overflow-hidden flex flex-col justify-between`}>
      <div className={`bg-gray-800 p-4 flex-1 overflow-y-auto`}>
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.author === username && "justify-end"}`}>
            <div
              className={`p-2 my-2 rounded-lg w-72 ${
                message.author === username ? "bg-blue-500 text-white" : "bg-purple-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form className={`bg-gray-850 p-4 flex items-center`} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here"
          value={inputValue}
          onChange={handleInputChange}
          className={`flex-1 p-2 rounded-lg`}
        />
        <button
          type="submit"
          className={`ml-4 p-2 bg-blue-400 text-white rounded-lg`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

