import React, { useState } from 'react';
import Question from '../components/question/question';
import './exam.css';
import Title from '../components/title/title';

const Exam: React.FC = () => {
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

  const [selected, setSelected] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const handleSelect = (qIdx: number, choiceIdx: number) => {
    setSelected(prev => {
      const copy = [...prev];
      copy[qIdx] = choiceIdx;
      console.log("Updated selected array:", copy); // Debugging
      return copy;
    });
  };

  const handleSubmit = () => {
    let correct = 0;
    let wrong: number[] = [];

    console.log("Selected answers:", selected);
    console.log("Correct indexes:", questions.map(q => q.correctIndex));

    selected.forEach((sel, i) => {
      if (sel === questions[i].correctIndex) {
        correct += 1;
      } else {
        wrong.push(i);
      }
    });

    setScore(correct);
    setIncorrect(wrong);
    setShowResult(true);

    console.log("Correct answers count:", correct);
    console.log("Incorrect questions:", wrong);
  };

  const handleClose = () => setShowResult(false);

  return (
    <div className="questions-page">
      <header className="questions-header">
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
      </header>

      <main className="questions-list">
        {questions.map((q, index) => (
          <Question
            key={index}
            index={index}
            question={q.question}
            choices={q.choices}
            correctIndex={q.correctIndex}
            selectedIndex={selected[index]}
            onSelect={(choiceIdx: number) => handleSelect(index, choiceIdx)}
            highlightIncorrect={showResult && incorrect.includes(index)}
          />
        ))}
        <button className="submit-button" type="button" onClick={handleSubmit}>
          Submit Exam
        </button>
      </main>

      {showResult && (
        <div className="result-popup">
          <div className="result-content">
            <h2>Exam Results</h2>
            <p>
              You got {score} out of {questions.length} correct!
            </p>
            <button onClick={handleClose} className="close-popup-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;