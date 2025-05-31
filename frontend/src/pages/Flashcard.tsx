import React, { useState } from 'react';
import Card from '../components/card/card';
import './Flashcard.css';
import Title from '../components/title/title';

const FlashcardPage: React.FC = () => {
  const flashcards = [
    { question: "What is a token?", answer: "A word or part of a word that is used by machine learning to understand and predict" },
    { question: "What is React?", answer: "A JavaScript library for building user interfaces" },
    { question: "What is an API?", answer: "A set of functions and protocols that allow applications to access data or interact with external software components" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
};

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flashcard-page">
      <div className="top-bar">
        <Title />
        <div className="nav-icons">
          <button className="nav-icon-button">
            <img src="/exit.png" alt="Exit" className="nav-icon" style={{backgroundColor: '#E45C87f0'}} />
          </button>
          <button className="nav-icon-button">
            <img src="/home.png" alt="Home" className="nav-icon" style={{backgroundColor: '#E5A0F6'}} />
          </button>
          <button className="nav-icon-button">
            <img src="/flashcard.png" alt="Flashcard" className="nav-icon" style={{backgroundColor: '#75E45C'}}/>
          </button>
          <button className="nav-icon-button">
            <img src="/exam.png" alt="Source" className="nav-icon" style={{backgroundColor: '#E2E45C'}}/>
          </button>
        </div>
      </div>

      <div className="card-container">
        <button className="arrow left" onClick={handlePrevious}>{'<'}</button>
        <Card key={currentIndex} question={flashcards[currentIndex].question} answer={flashcards[currentIndex].answer} />
        <button className="arrow right" onClick={handleNext}>{'>'}</button>
      </div>

      <button className="view-all-btn">View All Cards</button>
    </div>
  );
};

export default FlashcardPage;