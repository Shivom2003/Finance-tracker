"use client";

import { useState } from "react";
import { Send, BotMessageSquare, X } from "lucide-react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi, I'm still in works and I may be quite inaccurate, therefore apologies! How can I assist you?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 bg-chatbot-gradient shadow-2xl rounded-2xl p-4 border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-white">
              FinVise AI Chat
            </h2>
            <X
              className="w-5 h-5 cursor-pointer text-white hover:text-red-500"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Chat messages */}
          <div className="h-60 overflow-y-auto space-y-2 p-2 border rounded-lg bg-sidenav-light">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm ${
                  msg.sender === "bot"
                    ? "border bg-card-color text-white"
                    : "border bg-chat-send text-gray-900 text-right"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input field */}
          <div className="flex mt-3 border-t pt-2">
            <input
              type="text"
              className="flex-1 border rounded-lg p-2 text-sm outline-none"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={sendMessage}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      {!isOpen && (
        <button
          className="bg-navy-900 text-white p-3 rounded-full shadow-lg hover:bg-black"
          onClick={() => setIsOpen(true)}
        >
          <BotMessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
