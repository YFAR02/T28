import React from 'react';
import Sources from '../components/source/Sources';
import Title from '../components/title/title';
import ChatWindow from '../components/chatWindow/chatWindow';
import './Chat.css'; // Assuming you have a CSS file for styling
import Studio from '../components/studio/Studio';

const Chat: React.FC = () => {
    return (
        <div className='chat-page'>
            <div className="chat-header">
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

            <div className='chatbox-container'>
                <Sources />
                <ChatWindow /> 
                <Studio />
            </div>
        </div>
    );
};

export default Chat;