import React from 'react';
import Question from '../components/question/question';
import './exam.css';

const QuestionsPage: React.FC = () => {
  const questions = [
    {
      question: 'What is the programming language that sounds like coffee?',
      choices: ['Java', 'C#', 'Python', 'Assembly'],
      correctIndex: 0,
    },
    {
      question: 'What is the programming language that is named after a snake?',
      choices: ['Java', 'C#', 'Python', 'Assembly'],
      correctIndex: 2,
    },
    {
      question: "What is a programmer’s favorite snack?",
      choices: ['Nerds', 'Skittles'],
      correctIndex: 0,
    },
  ];

  return (
    <div className="questions-page">
      <header className="questions-header">
        <h1 className="logo">Study<span className="highlight">LM</span></h1>
        <div className="nav-icons">
          <img src="/exit.png" alt="Exit" className="nav-icon" />
          <img src="/home.png" alt="Home" className="nav-icon" />
          <img src="/flashcard.png" alt="Flashcard" className="nav-icon" />
          <img src="/source.png" alt="Source" className="nav-icon" />
        </div>
      </header>

      <main className="questions-list">
        {questions.map((q, index) => (
          <Question
            key={index}
            index={index}
            question={q.question}
            choices={q.choices}
            correctIndex={q.correctIndex}
          />
        ))}
      </main>
    </div>
  );
};

export default QuestionsPage;
