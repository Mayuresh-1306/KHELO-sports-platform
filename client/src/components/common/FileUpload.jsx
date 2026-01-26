// client/src/components/common/FileUpload.jsx
import React, { useState, useRef } from 'react';
import { FaUpload, FaTimes, FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFile, FaCheck } from 'react-icons/fa';
import '../../styles/components/imageUpload.css';

const FileUpload = ({
    onFilesSelect,
    multiple = true,
    maxSize = 10, // MB
    accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx",
    label = "Upload Files",
    category = "General"
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        switch (ext) {
            case 'pdf': return <FaFilePdf className="file-type-icon pdf" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'webp': return <FaFileImage className="file-type-icon image" />;
            case 'doc':
            case 'docx': return <FaFileWord className="file-type-icon word" />;
            case 'xls':
            case 'xlsx': return <FaFileExcel className="file-type-icon excel" />;
            default: return <FaFile className="file-type-icon" />;
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const validateFile = (file) => {
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSize) {
            setError(`File ${file.name} is too large. Max size: ${maxSize}MB`);
            return false;
        }

        const ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!accept.split(',').includes(ext)) {
            setError(`File type not supported: ${ext}`);
            return false;
        }

        setError('');
        return true;
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        processFiles(files);
    };

    const processFiles = (files) => {
        const validFiles = files.filter(file => validateFile(file));

        if (validFiles.length > 0) {
            const fileObjects = validFiles.map(file => ({
                file,
                name: file.name,
                size: formatFileSize(file.size),
                category: category,
                id: Date.now() + Math.random()
            }));

            const newFiles = multiple ? [...selectedFiles, ...fileObjects] : fileObjects;
            setSelectedFiles(newFiles);

            if (onFilesSelect) {
                onFilesSelect(newFiles);
            }
        }
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

        const files = Array.from(e.dataTransfer.files);
        processFiles(files);
    };

    const removeFile = (fileId) => {
        const newFiles = selectedFiles.filter(f => f.id !== fileId);
        setSelectedFiles(newFiles);
        if (onFilesSelect) {
            onFilesSelect(newFiles);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setUploading(true);
        // Simulate upload
        setTimeout(() => {
            setUploading(false);
            setSelectedFiles([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }, 2000);
    };

    return (
        <div className="file-upload-container">
            {label && <label className="upload-label">{label}</label>}

            <div
                className={`upload-dropzone ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <FaUpload className="upload-icon" />
                <h4>Drag & Drop Files or Click to Browse</h4>
                <p>Supports: PDF, DOC, JPG, PNG, XLS (Max {maxSize}MB each)</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>

            {error && <p className="upload-error">{error}</p>}

            {selectedFiles.length > 0 && (
                <div className="selected-files-list">
                    <h4>Selected Files ({selectedFiles.length})</h4>
                    {selectedFiles.map(fileObj => (
                        <div key={fileObj.id} className="file-item">
                            {getFileIcon(fileObj.name)}
                            <div className="file-info">
                                <span className="file-name">{fileObj.name}</span>
                                <span className="file-size">{fileObj.size}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(fileObj.id)}
                                className="remove-file-btn"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
