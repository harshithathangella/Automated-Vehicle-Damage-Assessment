import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
    setResult(null);  // clear previous result when new file selected
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setResult(res.data);
    } catch (err) {
      console.error('Upload failed:', err);

      if (err.response && err.response.data && err.response.data.error) {
        alert('Error from server: ' + err.response.data.error);
      } else {
        alert('Prediction failed. Check console for details.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Vehicle Damage Assessment</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleUpload}>Upload</button>

      {previewURL && (
        <div style={{ marginTop: '20px' }}>
          <h4>Image Preview:</h4>
          <img src={previewURL} alt="Preview" width="300" style={{ borderRadius: '8px', boxShadow: '0 0 8px rgba(0,0,0,0.2)' }} />
        </div>
      )}

      {result && (
        <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Prediction Result</h3>
          <p><strong>Damage Type:</strong> {result.damage_type}</p>
          <p><strong>Description:</strong> {result.description}</p>
          <p><strong>Estimated Cost:</strong> ₹{result.estimated_cost}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
