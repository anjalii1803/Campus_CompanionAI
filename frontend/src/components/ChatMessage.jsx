import React, { useState } from 'react';
import { User, Copy, Check, AlertCircle } from 'lucide-react';
import { LogoIcon } from './Logo';

const ChatMessage = ({ role = 'ai', text = '', timestamp, isError = false }) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === 'user';

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple formatter to handle newlines, bullet points, and basic markdown bold
  const renderFormattedText = (content) => {
    if (!content) return null;
    const lines = content.split('\n');

    return lines.map((line, lineIdx) => {
      // Parse basic bold markdown: **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      if (isBullet) {
        return (
          <div key={lineIdx} className="chat-bullet-line">
            <span className="bullet-point">•</span>
            <span>{formattedParts}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className={line === '' ? 'empty-line' : 'chat-text-line'}>
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <div className={`chat-message-row ${isUser ? 'user-row' : 'ai-row'}`}>
      <div className={`chat-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}`}>
        {isUser ? (
          <User size={18} />
        ) : isError ? (
          <AlertCircle size={18} />
        ) : (
          <LogoIcon size={22} />
        )}
      </div>

      <div className={`chat-bubble ${isUser ? 'user-bubble' : 'ai-bubble'} ${isError ? 'error-bubble' : ''}`}>
        <div className="chat-bubble-header">
          <span className="sender-name">{isUser ? 'You' : 'MNNIT Campus AI'}</span>
          {timestamp && <span className="message-time">{timestamp}</span>}
        </div>

        <div className="chat-bubble-content">
          {renderFormattedText(text)}
        </div>

        {!isUser && text && (
          <div className="chat-bubble-footer">
            <button
              onClick={handleCopy}
              className="copy-btn"
              title="Copy response"
              aria-label="Copy message"
            >
              {copied ? (
                <>
                  <Check size={14} className="copied-icon" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
