import React, { createContext, useContext, useState } from 'react';
import { sendChatMessage } from '../services/api';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      role: 'ai',
      text: "Welcome to Campus Companion — MNNIT Allahabad! 🏛️\nHow can I help you today? You can ask about class timetables, lecture rooms, faculty details, campus events, or upload circular notices.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  /**
   * Send a message to the AI backend and record response in history
   */
  const sendMessage = async (textToSend) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Append user message immediately & clear input
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Call POST /api/chat via api service
      const response = await sendChatMessage(messageText);

      let replyText = 'No response received from the assistant.';
      if (response && response.data && response.data.reply) {
        replyText = response.data.reply;
      } else if (response && response.reply) {
        replyText = response.reply;
      }

      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Chat API Error:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unable to connect to Campus Companion AI. Please ensure the backend is running.';

      setError(errorMessage);

      const errorAiMessage = {
        id: `ai-error-${Date.now()}`,
        role: 'ai',
        text: `⚠️ **Connection Error**: ${errorMessage}\n\n*Make sure your backend server is running at http://localhost:5000.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };

      setMessages((prev) => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'ai',
        text: "Chat cleared! How can I assist you with your MNNIT campus queries?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setError(null);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        error,
        inputValue,
        setInputValue,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
