import React, { useState } from 'react';
import Sources from '../components/source/Sources';
import Title from '../components/title/title';
import ChatWindow from '../components/chatWindow/chatWindow';
import './Chat.css'; // Assuming you have a CSS file for styling
import Studio from '../components/studio/Studio';
import FileUploadModal from '../components/FileUploadModal';

const Chat: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className='chat-page'>
            <Title />
            <button className="add-btn" onClick={() => setModalOpen(true)}>Add</button>
            <FileUploadModal open={modalOpen} onClose={() => setModalOpen(false)} />
            <div className='chatbox-container'>
                <Sources />
                <ChatWindow /> 
                <Studio />
            </div>
        </div>
    );
};

export default Chat;