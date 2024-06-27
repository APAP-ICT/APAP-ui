import React, { useState } from 'react';
import axios from 'axios';
import './PhotoUploader.css';

const PhotoUploader = () => {
  const [photo, setPhoto] = useState(null);
  const [photoBase64, setPhotoBase64] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [serverUrl, setServerUrl] = useState('http://localhost:3000/api/upload');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFileInvalid, setIsFileInvalid] = useState(false);

  const handleFileChange = (files) => {
    if (files.length > 0) {
      const file = files[0];
      const validExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (validExtensions.includes(fileExtension)) {
        setPhoto(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
          setPhotoBase64(reader.result.split(',')[1]); // base64 인코딩된 문자열 저장
        };
        reader.readAsDataURL(file);
        setErrorMessage('');
        setIsFileInvalid(false);
      } else {
        setErrorMessage('파일 형식을 다시 한번 확인해주세요.');
        setPhoto(null);
        setPreviewUrl('');
        setIsFileInvalid(true);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!photoBase64 || isFileInvalid) {
      return;
    }
  
    try {
      const [uploadResponse] = await Promise.all([
        axios.post(serverUrl, { photo: photoBase64 }, {
          headers: {
            'Content-Type': 'application/json',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        }),
        new Promise((resolve) => {
          setPhoto(null);
          setPreviewUrl('');
          setPhotoBase64('');
          setUploadProgress(0);
          resolve();
        }),
      ]);
  
      console.log(uploadResponse.data.message);
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadProgress(0);
    }
  };
  

  return (
    <div className="photo-uploader" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {photo && (
        <div className="preview-container">
          <img className="photo-preview" src={previewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
      <div className="input-container" style={{ marginTop: '30px' }}>
        <div className="progress-container">
          {uploadProgress > 0 && (
            <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
              {uploadProgress}%
            </div>
          )}
        </div>
        <input type="file" onChange={(e) => handleFileChange(e.target.files)} />
        <button
          className={`upload-button ${isFileInvalid ? 'disabled' : ''}`}
          type="submit"
          onClick={handleSubmit}
          disabled={isFileInvalid}
          style={{
            backgroundColor: isFileInvalid ? '#ccc' : '#007bff',
            color: isFileInvalid ? '#666' : '#fff',
            cursor: isFileInvalid ? 'not-allowed' : 'pointer',
            padding: '12px 24px',
            fontSize: '18px',
            marginTop: '15px',
          }}
        >
          Upload Files
        </button>
        {errorMessage && (
          <div className="error-message-overlay" style={{ marginTop: '15px' }}>
            <div className="error-message-content">{errorMessage}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploader;
