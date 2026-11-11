import React from 'react';
import { HelpCircle, Sparkles, MapPin, Calendar, BookOpen, Clock } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const DEFAULT_QUESTIONS = [
  { text: 'What class do I have tomorrow?', icon: Calendar },
  { text: 'Where is L1 Lab?', icon: MapPin },
  { text: 'Any upcoming events?', icon: Sparkles },
  { text: 'Who teaches DBMS?', icon: BookOpen },
  { text: "Where is Dr. Manoj Wairiya's cabin?", icon: Clock },
  { text: 'Show MCA 3rd Sem timetable for Monday', icon: Calendar },
];

const SuggestedQuestions = ({ onSelectQuestion }) => {
  const { setInputValue } = useChat();

  const handleChipClick = (questionText) => {
    if (onSelectQuestion) {
      onSelectQuestion(questionText);
    } else {
      setInputValue(questionText);
    }
  };

  return (
    <div className="suggested-questions-container">
      <div className="suggested-header">
        <Sparkles size={16} className="suggested-icon" />
        <span>Suggested Questions</span>
      </div>
      <div className="suggested-chips">
        {DEFAULT_QUESTIONS.map((q, idx) => {
          const Icon = q.icon || HelpCircle;
          return (
            <button
              key={idx}
              type="button"
              className="suggestion-chip"
              onClick={() => handleChipClick(q.text)}
              title={`Click to fill: "${q.text}"`}
            >
              <Icon size={14} className="chip-icon" />
              <span>{q.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
