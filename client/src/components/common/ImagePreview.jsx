// client/src/components/common/ImagePreview.jsx
import React, { useEffect } from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';
import '../../styles/components/imageUpload.css';

const ImagePreview = ({ image, alt, onClose, onDownload }) => {
    useEffect(() => {
        // Prevent body scroll when modal is open
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    if (!image) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDownload = () => {
        if (onDownload) {
            onDownload(image);
        } else {
            // Default download behavior
            const link = document.createElement('a');
            link.href = image;
            link.download = alt || 'image';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="image-preview-modal animate-fadeIn" onClick={handleBackdropClick}>
            <div className="preview-modal-content animate-scaleIn" onClick={(e) => e.stopPropagation()}>
                <div className="preview-modal-header">
                    <h3>{alt || 'Image Preview'}</h3>
                    <div className="preview-actions">
                        <button
                            onClick={handleDownload}
                            className="btn btn-small btn-outline"
                            title="Download"
                        >
                            <FaDownload />
                        </button>
                        <button
                            onClick={onClose}
                            className="btn btn-small btn-outline"
                            title="Close"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
                <div className="preview-modal-body">
                    <img src={image} alt={alt} className="preview-image" />
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;
