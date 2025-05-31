console.log(localStorage.getItem('token'));import React, { useState } from 'react';
import FileUpload from './FileUpload';
import './Modal.css';

const FileUploadModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Upload File</h2>
        <FileUpload />
      </div>
    </div>
  );
};

export default FileUploadModal;
