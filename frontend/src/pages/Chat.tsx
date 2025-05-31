import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sources from '../components/source/Sources';
import Title from '../components/title/title';
import ChatWindow from '../components/chatWindow/chatWindow';
import './Chat.css'; // Assuming you have a CSS file for styling
import Studio from '../components/studio/Studio';
import FileUploadModal from '../components/FileUploadModal';

const Chat: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleGoToFlashcards = () => {
        navigate('/flashcard', { state: { selectedFile } });
    };

    return (
        <div className='chat-page'>
            <Title />
            {/* <button className="add-btn" onClick={() => setModalOpen(true)}>Add</button> */}
            <FileUploadModal open={modalOpen} onClose={() => setModalOpen(false)} />
            <div className='chatbox-container'>
                <Sources onFileSelect={setSelectedFile} />
                <ChatWindow selectedFile={selectedFile} />
                <Studio />
            </div>
            <button className="go-flashcards-btn" onClick={handleGoToFlashcards} disabled={!selectedFile}>
                Go to Flashcards
            </button>
        </div>
    );
};

export default Chat;