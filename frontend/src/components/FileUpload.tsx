import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    // Use OAuth2 access_token and Bearer header
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch('http://localhost:8000/core/upload-file/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage('Upload failed.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default FileUpload;
