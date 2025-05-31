import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Card from '../components/card/card';
import './Flashcard.css';
import Title from '../components/title/title';

const FlashcardPage: React.FC = () => {
  const location = useLocation();
  const selectedFile = location.state?.selectedFile as string | null;
  const [flashcards, setFlashcards] = useState<{ question: string; answer: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!selectedFile) return;
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/core/chatFlashcards/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ file_path: selectedFile }),
      });
      if (response.ok) {
        const data = await response.json();
        // Expecting data.flashcards: [{term, definition}]
        setFlashcards(data.flashcards.map((fc: any) => ({ question: fc.term, answer: fc.definition })));
      }
    };
    fetchFlashcards();
  }, [selectedFile]);

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
        {flashcards.length > 0 ? (
          <Card key={currentIndex} question={flashcards[currentIndex].question} answer={flashcards[currentIndex].answer} />
        ) : (
          <div className="no-flashcards">No flashcards loaded.</div>
        )}
        <button className="arrow right" onClick={handleNext}>{'>'}</button>
      </div>

      <button className="view-all-btn">View All Cards</button>
    </div>
  );
};

export default FlashcardPage;