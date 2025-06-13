import React, { useState } from 'react';
import './Upload.css';

function Upload({ onLogout }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile); // Important: "image" must match backend

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Upload failed");
        setResult(null);
      } else {
        setResult(data);
        setError(null);
      }
    } catch (err) {
      setError("Server error or network issue");
      setResult(null);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Vehicle Damage Image</h2>

      <input type="file" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} alt="Preview" className="preview-image" />}

      <button onClick={handleUpload}>Upload</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Prediction Result:</h3>
          <p><strong>Damage Type:</strong> {result.damage_type}</p>
          <p><strong>Description:</strong> {result.description}</p>
          <p><strong>Estimated Cost:</strong> ₹{result.estimated_cost}</p>
        </div>
      )}

      <button
        onClick={onLogout}
        style={{
          marginTop: 20,
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Upload;
