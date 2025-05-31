import React from 'react';
import Sources from '../components/source/Sources';
import Title from '../components/title/title';
import ChatWindow from '../components/chatWindow/chatWindow';
import './Chat.css'; // Assuming you have a CSS file for styling

const Chat: React.FC = () => {
    return (
        <div>
            <Title />
            <div className='chatbox-container'>
                <Sources />
                <ChatWindow /> {/* Add ChatWindow here */}
            </div>
        </div>
    );
};

export default Chat;