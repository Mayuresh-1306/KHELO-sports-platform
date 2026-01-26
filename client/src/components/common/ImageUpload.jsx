// client/src/components/common/ImageUpload.jsx
import React, { useState, useRef } from 'react';
import { FaUpload, FaTimes, FaImage } from 'react-icons/fa';
import '../../styles/components/imageUpload.css';

const ImageUpload = ({ 
  onImageSelect, 
  currentImage = null, 
  maxSize = 5, // MB
  accept = "image/jpeg,image/png,image/webp",
  label = "Upload Image",
  preview = true 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(currentImage);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!file) return false;

    // Check file type
    const validTypes = accept.split(',');
    const fileType = file.type;
    if (!validTypes.some(type => fileType.includes(type.split('/')[1]))) {
      setError(`Please select a valid image file (${accept})`);
      return false;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    setError('');
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      if (onImageSelect) {
        onImageSelect(file, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onImageSelect) {
      onImageSelect(null, null);
    }
  };

  return (
    <div className="image-upload-container">
      {label && <label className="upload-label">{label}</label>}
      
      {!imagePreview ? (
        <div
          className={`upload-dropzone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <FaImage className="upload-icon" />
          <h4>Drag & Drop or Click to Upload</h4>
          <p>Supports: JPG, PNG, WebP (Max {maxSize}MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="image-preview-container">
          <img src={imagePreview} alt="Preview" className="image-preview" />
          <button
            type="button"
            onClick={removeImage}
            className="remove-image-btn"
          >
            <FaTimes />
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="change-image-btn btn btn-small btn-outline"
          >
            <FaUpload /> Change Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      )}
      
      {error && <p className="upload-error">{error}</p>}
    </div>
  );
};

export default ImageUpload;
