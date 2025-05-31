import React from 'react';
import Sources from '../components/source/Sources';
import Title from '../components/title/title';
import ChatWindow from '../components/chatWindow/chatWindow';
import './Chat.css'; // Assuming you have a CSS file for styling
import Studio from '../components/studio/Studio';

const Chat: React.FC = () => {
    return (
        <div className='chat-page'>
            <Title />
            <div className='chatbox-container'>
                <Sources />
                <ChatWindow /> 
                <Studio />
            </div>
        </div>
    );
};

export default Chat;