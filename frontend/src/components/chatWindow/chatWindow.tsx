import React from 'react';
import './chatWindow.css';

const ChatWindow: React.FC = () => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <span className="chat-tab">CHAT</span>
      </div>

      <div className="chat-title-section">
        <h2 className="chat-title">csc448 Compiler Design</h2>
        <p className="chat-description">
          Compiler Design is a course focused on the theory and implementation of compilers, 
          which are programs that translate source code written in a high-level programming 
          language into a lower-level language like assembly or machine code. Students learn 
          about the different phases of compilation, including lexical analysis, syntax analysis 
          (parsing), semantic analysis, intermediate code generation, optimization, and final 
          code generation...
        </p>
      </div>

      <div className="chat-input-section">
        <input type="text" className="chat-input" placeholder="Start typing..." />
        <div className="chat-footer">
          <div className='stack'>
            <span className="token-count">43 sources</span>
            <span className="source-label">Hover over a prompt to see which source it came from.</span>
          </div>
          <img src="send.png" alt="Send" className="send-button" />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
