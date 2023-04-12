import React, { useEffect, useState } from "react";
import { ApiService, Message } from "../api/firebase";

import Markdown from "marked-react";

export const ChatPage = ({ username, channel, goBack }: {
  username: string,
  channel: string,
  goBack: () => void,
}) => {

  const api = ApiService(channel, username)
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(0)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(inputValue === "") return
    if(editingId) api.editMessage(editingId, inputValue)
    else api.createMessage(inputValue)
    setEditingId(0)
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
  }, [])

  return (
    <div className={`h-screen w-screen overflow-hidden flex flex-col justify-between`}>
      <div className="flex justify-between items-center bg-gray-800 p-4">
        <button onClick={() => goBack()}>{`< Go back`}</button>
        <h1 className="text-xl font-bold">{channel}</h1>
        <div></div>
      </div>
      <div className={`bg-gray-800 p-4 flex-1 overflow-y-auto`}>
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.author === username && "justify-end"}`}>
            <div
              className={`p-2 my-2 rounded-lg w-72 ${
                message.author === username ? "bg-blue-500" : "bg-green-700"
              }`}
            >
              <div className="relative">
                <p className="text-white text-xs">{message.author}</p>
                <Markdown>{message.text}</Markdown>
                {message.author === username && <div className="absolute top-0 right-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
                  <button onClick={() => {
                    setEditingId(message.id)
                    setInputValue(message.text)
                  }}>✏️</button>
                  <button onClick={() => api.deleteMessage(message.id)}>🗑</button>
                </div>}
              </div>
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
          ✉️
        </button>
      </form>
    </div>
  );
};

