// client/src/pages/DocumentsPage.jsx
import React, { useState } from 'react';
import { FaUpload, FaDownload, FaEye, FaTrash, FaFilePdf, FaFileImage, FaFileWord, FaFileExcel } from 'react-icons/fa';
import "../styles/pages/documents.css";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Medical Certificate.pdf', type: 'pdf', size: '2.4 MB', uploaded: '2024-11-15' },
    { id: 2, name: 'Player Contract.docx', type: 'word', size: '1.8 MB', uploaded: '2024-11-10' },
    { id: 3, name: 'ID Proof.jpg', type: 'image', size: '3.2 MB', uploaded: '2024-11-05' },
    { id: 4, name: 'Training Schedule.xlsx', type: 'excel', size: '850 KB', uploaded: '2024-10-28' },
    { id: 5, name: 'Achievements Certificate.pdf', type: 'pdf', size: '1.5 MB', uploaded: '2024-10-20' },
  ]);
  const [uploading, setUploading] = useState(false);

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FaFilePdf className="file-icon pdf" />;
      case 'word': return <FaFileWord className="file-icon word" />;
      case 'image': return <FaFileImage className="file-icon image" />;
      case 'excel': return <FaFileExcel className="file-icon excel" />;
      default: return <FaFilePdf className="file-icon" />;
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      // Simulate upload
      setTimeout(() => {
        const newDoc = {
          id: documents.length + 1,
          name: file.name,
          type: file.type.split('/')[1] === 'pdf' ? 'pdf' : 
                file.type.includes('image') ? 'image' : 
                file.type.includes('word') ? 'word' : 
                file.type.includes('excel') ? 'excel' : 'other',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploaded: new Date().toISOString().split('T')[0]
        };
        setDocuments([newDoc, ...documents]);
        setUploading(false);
      }, 1000);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleDownload = (document) => {
    // In real app, this would download the actual file
    alert(`Downloading ${document.name}`);
  };

  const handleView = (document) => {
    // In real app, this would open the document
    alert(`Viewing ${document.name}`);
  };

  return (
    <div className="documents-page">
      <div className="page-header">
        <h1>Documents</h1>
        <p>Manage and upload player documents</p>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <div className="upload-card">
          <div className="upload-icon">
            <FaUpload />
          </div>
          <h3>Upload New Document</h3>
          <p>Upload medical certificates, contracts, ID proofs, etc.</p>
          <div className="upload-zone">
            <input
              type="file"
              id="file-upload"
              onChange={handleUpload}
              style={{ display: 'none' }}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
            />
            <label htmlFor="file-upload" className="upload-button">
              {uploading ? 'Uploading...' : 'Choose File'}
            </label>
            <p className="upload-hint">Supports: PDF, DOC, JPG, PNG, XLS (Max: 10MB)</p>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="documents-section">
        <div className="section-header">
          <h2>All Documents ({documents.length})</h2>
          <div className="sort-options">
            <select className="sort-select">
              <option>Sort by: Newest First</option>
              <option>Sort by: Oldest First</option>
              <option>Sort by: Name A-Z</option>
              <option>Sort by: Size</option>
            </select>
          </div>
        </div>

        {documents.length > 0 ? (
          <div className="documents-grid">
            {documents.map(doc => (
              <div key={doc.id} className="document-card">
                <div className="document-header">
                  {getFileIcon(doc.type)}
                  <div className="document-info">
                    <h4>{doc.name}</h4>
                    <p className="document-meta">
                      {doc.size} • Uploaded on {doc.uploaded}
                    </p>
                  </div>
                </div>
                
                <div className="document-actions">
                  <button 
                    onClick={() => handleView(doc)}
                    className="btn-action"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button 
                    onClick={() => handleDownload(doc)}
                    className="btn-action"
                    title="Download"
                  >
                    <FaDownload />
                  </button>
                  <button 
                    onClick={() => handleDelete(doc.id)}
                    className="btn-action delete"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FaFilePdf size={64} />
            </div>
            <h3>No documents uploaded</h3>
            <p>Upload your first document to get started</p>
          </div>
        )}
      </div>

      {/* Storage Info */}
      <div className="storage-info">
        <div className="storage-header">
          <h4>Storage Usage</h4>
          <span>8.75 MB / 100 MB</span>
        </div>
        <div className="storage-bar">
          <div className="storage-fill" style={{ width: '8.75%' }}></div>
        </div>
        <p className="storage-hint">You have used 8.75% of your available storage</p>
      </div>
    </div>
  );
};

export default DocumentsPage;