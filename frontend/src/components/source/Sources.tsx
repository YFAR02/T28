import React, { useState, useEffect } from 'react';
import './Sources.css';

const Sources: React.FC = () => {
  const [sources, setSources] = useState<string[]>([]);
  const [selected, setSelected] = useState<boolean[]>([]);

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
        // Assuming each file object has a 'filename' property
        setSources(data.map((file: any) => file.filename));
        setSelected(Array(data.length).fill(false));
      }
    };
    fetchSources();
  }, []);

  const toggleAll = () => {
    const allSelected = selected.every(Boolean);
    setSelected(Array(sources.length).fill(!allSelected));
  };

  const toggleOne = (index: number) => {
    setSelected(prev => prev.map((val, i) => (i === index ? !val : val)));
  };

  return (
    <div className="sources-container">
      <div className="sources-header">
        <span className="title">SOURCES</span>
        <img src="add.png" alt="add icon" className="add-icon" />
      </div>

      <div className="sources-select-all">
        <span>SELECT ALL SOURCES</span>
        <input type="checkbox" checked={selected.every(Boolean)} onChange={toggleAll} />
      </div>

      <div className="sources-list">
        {sources.map((source, index) => (
          <div className="source-item" key={index}>
            <img src="source.png" alt="File Icon" className="file-icon" />
            <span className="filename">{source}</span>
            <input
              type="checkbox"
              checked={selected[index]}
              onChange={() => toggleOne(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sources;