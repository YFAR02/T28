import React, { useState } from 'react';
import './card.css';

interface CardProps {
  question: string;
  answer: string; // Add answer prop
}

const Card: React.FC<CardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      {isFlipped ? (
        <p className="card-text">{answer}</p>
      ) : (
        <p className="card-text">{question}</p>
      )}
      <span className="corner-icon">↘</span>
    </div>
  );
};

export default Card;
