import React, { useState } from 'react';
import './question.css';

interface QuestionProps {
  index: number;
  question: string;
  choices: string[];
  correctIndex: number;
}

const Question: React.FC<QuestionProps> = ({ index, question, choices, correctIndex }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(i);
    }
  };

  return (
    <div className="question-card">
      <button className="question-label">Question {index + 1}</button>
      <p className="question-text">{question}</p>
      <ul className="choice-list">
        {choices.map((choice, i) => {
          let className = "choice";
          if (selectedIndex !== null) {
            if (i === correctIndex) {
              className += " correct";
            } else if (i === selectedIndex) {
              className += " incorrect";
            }
          }

          return (
            <li
              key={i}
              className={className}
              onClick={() => handleSelect(i)}
            >
              {choice}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Question;
