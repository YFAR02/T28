import React, { useState } from 'react';
import './Studio.css';

const Studio: React.FC = () => {
  const [numQuestions, setNumQuestions] = useState(10);

  return (
    <div className="studio-outer">
      <div className="studio-container">
        <div className="studio-header">
          <span className="studio-tab">STUDIO</span>
        </div>
        <div className="studio-card">
          <p className="studio-question">WHAT IS A TOKEN?</p>
        </div>
        <a href="/flashcard" className="studio-flashcards-btn">VIEW FLASHCARDS</a>
        <div className="studio-questions-section">
          <span className="studio-questions-label">NUMBER OF QUESTIONS</span>
          <div className="studio-questions-toggle">
            <button
              className={`studio-toggle-btn ${numQuestions === 10 ? 'active' : ''}`}
              onClick={() => setNumQuestions(10)}
            >
              10
            </button>
            <button
              className={`studio-toggle-btn ${numQuestions === 20 ? 'active' : ''}`}
              onClick={() => setNumQuestions(20)}
            >
              20
            </button>
          </div>
        </div>
        <button
          className="studio-exam-btn"
          onClick={() => {
            // Example: navigate to exam page with selected number of questions
            window.location.href = `/exam?numQuestions=${numQuestions}`;
          }}
        >
          PRACTICE EXAM
        </button>
      </div>
    </div>
  );
};

export default Studio;