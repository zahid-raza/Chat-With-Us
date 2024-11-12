import { useState } from "react";
import { MessageCircle, Send, X, Minus, MessageCircleX } from "lucide-react";
import "./ChatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "agent" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: newMessage,
          sender: "user",
        },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "Thanks for your message! Our team will get back to you soon.",
            sender: "agent",
          },
        ]);
      }, 1000);

      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-button-wrapper">
        {isOpen && (
          <div className={`chat-window ${isMinimized ? "minimized" : ""}`}>
            <div className="chat-header">
              <div className="chat-title">
                <MessageCircle style={{ color: "#3BA9E5" }} />
                <span>Chat with us</span>
              </div>
              <div className="chat-controls">
                <button onClick={() => setIsMinimized(!isMinimized)}>
                  <Minus />
                </button>
                <button onClick={() => setIsOpen(false)}>
                  <X />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="chat-messages">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message-wrapper ${message.sender}`}
                    >
                      <div className="message">{message.text}</div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSend} className="chat-input-form">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <button type="submit">
                    <Send />
                  </button>
                </form>
              </>
            )}
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`chat-toggle-button ${isOpen ? "active" : ""}`}
        >
          {isOpen ? <MessageCircleX /> : <MessageCircle />}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
