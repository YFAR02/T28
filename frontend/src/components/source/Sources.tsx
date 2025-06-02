import React, { useState } from 'react';
import './Sources.css';
//import { FaFilePdf } from 'react-icons/fa';
// import { FiPlus, FiSearch } from 'react-icons/fi';

const mockSource = Array.from({ length: 15 }, (_, i) => `CSC448-LECTURE${String(i + 1).padStart(2, '0')}.PDF`);

const Sources: React.FC = () => {
  const [selected, setSelected] = useState<boolean[]>(Array(mockSource.length).fill(false));

  const toggleAll = () => {
    const allSelected = selected.every(Boolean);
    setSelected(Array(mockSource.length).fill(!allSelected));
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
        {mockSource.map((source, index) => (
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
