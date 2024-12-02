import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to send the user's message and fetch AI response
  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, { text: input, sender: "user" }];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // API call to fetch the assistant's response
      const response = await axios.post("http://localhost:5000/api/chat", {
        messages: updatedMessages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      });

      const assistantMessage = response.data.choices[0].message.content;
      setMessages([
        ...updatedMessages,
        { text: assistantMessage, sender: "assistant" },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages([
        ...updatedMessages,
        { text: "Error: Unable to fetch response.", sender: "assistant" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Centered Chat Box */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg flex flex-col h-[80%]">
        {/* Chat Window */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl shadow-md max-w-[70%] break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-xl shadow-md bg-gray-200 max-w-[70%] break-words">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-gray-300">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className={`px-4 py-2 rounded-lg text-white ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
