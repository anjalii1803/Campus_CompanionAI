import React, { useRef, useEffect } from 'react';
import { Send, Loader2, Trash2 } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import ChatMessage from './ChatMessage';
import { LogoIcon } from './Logo';

const ChatBox = () => {
  const {
    messages,
    isLoading,
    error,
    inputValue,
    setInputValue,
    sendMessage,
    clearChat,
  } = useChat();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chatbox-card">
      {/* Header with status & clear option */}
      <div className="chatbox-header">
        <div className="chatbox-header-info">
          <div className="chatbox-header-avatar">
            <LogoIcon size={26} />
          </div>
          <div>
            <h3 className="chatbox-title">MNNIT Campus Assistant</h3>
            <span className="chatbox-subtitle">
              {isLoading ? 'Searching MNNIT database...' : 'Motilal Nehru National Institute of Technology'}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={clearChat}
          className="clear-chat-btn"
          title="Clear conversation"
          aria-label="Clear chat"
        >
          <Trash2 size={16} />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Message history */}
      <div className="chatbox-messages" role="log" aria-live="polite">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            text={msg.text}
            timestamp={msg.timestamp}
            isError={msg.isError}
          />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="chat-message-row ai-row">
            <div className="chat-avatar ai-avatar pulsing">
              <LogoIcon size={22} />
            </div>
            <div className="chat-bubble ai-bubble loading-bubble">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="loading-label">MNNIT Assistant is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="chatbox-input-form">
        <div className="chatbox-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Ask about timetable, room locations, faculty, events..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button
            type="submit"
            className={`send-button ${!inputValue.trim() || isLoading ? 'disabled' : ''}`}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 size={18} className="spinner" />
            ) : (
              <>
                <Send size={18} />
                <span className="send-text">Send</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
