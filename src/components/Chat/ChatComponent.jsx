import React, { useState, useEffect } from 'react';

const ChatComponent = ({ activeUser }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello! How can I help you today, ${activeUser.fullname}?`, sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setMessages([
      { id: 1, text: `Hello! How can I help you today, ${activeUser.fullname}?`, sender: 'bot' },
    ]);
  }, [activeUser]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, text: 'I am here to assist you!', sender: 'bot' },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] w-full border border-gray-700 rounded-lg shadow-lg bg-gray-800 text-white">
      <div className="p-4 font-bold border-b border-gray-700">Chat with {activeUser.fullname}</div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex my-2 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center border-t border-gray-700 p-4">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
