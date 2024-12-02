import React from "react";
import Chat from "./components/Chat.jsx"; // Import the Chat component

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white text-center p-4">
        <h1 className="text-2xl font-bold">AI Financial Assistant</h1>
        <p className="text-sm">Ask professional financial questions and get instant answers!</p>
      </header>

      {/* Chat Component */}
      <main className="flex-grow">
        <Chat />
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-2">
        <p className="text-sm">
          Powered by <a href="https://openai.com/" className="text-blue-500 underline">OpenAI's ChatGPT API</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
