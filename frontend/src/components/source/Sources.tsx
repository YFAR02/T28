import React, { useState, useEffect } from 'react';
import './Sources.css';
import FileUploadModal from '../FileUploadModal';

interface SourcesProps {
  onFileSelect: (filePath: string | null) => void;
}

const Sources: React.FC<SourcesProps> = ({ onFileSelect }) => {
  const [sources, setSources] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchSources = async () => {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/core/my-files/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSources(data.map((file: any) => file.filename));
      }
    };
    fetchSources();
  }, []);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onFileSelect(index !== null ? sources[index] : null);
  };

  return (
    <div className="sources-container">
      <div className="sources-header">
        <span className="title">SOURCES</span>
        <img
          src="add.png"
          alt="add icon"
          className="add-icon"
          onClick={() => setModalOpen(true)}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <FileUploadModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="sources-list">
        {sources.map((source, index) => (
          <div className="source-item" key={index}>
            <img src="source.png" alt="File Icon" className="file-icon" />
            <span className="filename">{source}</span>
            <input
              type="radio"
              checked={selectedIndex === index}
              onChange={() => handleSelect(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sources;