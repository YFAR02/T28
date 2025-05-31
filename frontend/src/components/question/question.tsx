import React, { useState } from 'react';
import './Question.css';

interface QuestionProps {
  index: number;
  question: string;
  choices: string[];
  correctIndex: number;
}

const Question: React.FC<QuestionProps> = ({ index, question, choices, correctIndex }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    setSelectedIndex(i);
  };

  return (
    <div className="question-card">
      <button className="question-label" style={{ marginRight: 24, marginBottom: 0 }}>QUESTION {index + 1}</button>
      <div style={{ flex: 1 }}>
        <span className="question-text" style={{ fontWeight: 700, fontSize: 24 }}>{question}</span>
        <ul className="choice-list" style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {choices.map((choice, i) => (
            <li
              key={i}
              className="choice"
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 700,
                fontSize: 20,
                color: '#fff',
                fontFamily: "'VT323', monospace",
                marginBottom: 0,
                cursor: selectedIndex === null ? 'pointer' : 'default'
              }}
              onClick={() => handleSelect(i)}
            >
              <input
                type="radio"
                name={`question-${index}`}
                checked={selectedIndex === i}
                readOnly
                style={{
                  accentColor: '#bfc2e6',
                  width: 22,
                  height: 22,
                  marginRight: 16,
                  borderRadius: 6,
                  border: '2px solid #bfc2e6',
                  background: '#23223e'
                }}
                tabIndex={-1}
              />
              {choice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Question;
