import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaTimesCircle 
} from 'react-icons/fa';

// Custom toast components
const SuccessToast = ({ message }) => (
  <div className="custom-toast success">
    <FaCheckCircle className="toast-icon" />
    <div className="toast-content">
      <h4>Success!</h4>
      <p>{message}</p>
    </div>
  </div>
);

const ErrorToast = ({ message }) => (
  <div className="custom-toast error">
    <FaTimesCircle className="toast-icon" />
    <div className="toast-content">
      <h4>Error!</h4>
      <p>{message}</p>
    </div>
  </div>
);

const WarningToast = ({ message }) => (
  <div className="custom-toast warning">
    <FaExclamationCircle className="toast-icon" />
    <div className="toast-content">
      <h4>Warning!</h4>
      <p>{message}</p>
    </div>
  </div>
);

const InfoToast = ({ message }) => (
  <div className="custom-toast info">
    <FaInfoCircle className="toast-icon" />
    <div className="toast-content">
      <h4>Info</h4>
      <p>{message}</p>
    </div>
  </div>
);

// Toast functions
export const showSuccess = (message, options = {}) => {
  toast.success(<SuccessToast message={message} />, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

export const showError = (message, options = {}) => {
  toast.error(<ErrorToast message={message} />, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

export const showWarning = (message, options = {}) => {
  toast.warning(<WarningToast message={message} />, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

export const showInfo = (message, options = {}) => {
  toast.info(<InfoToast message={message} />, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

// Custom Toast Container
export const CustomToastContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    className="custom-toast-container"
  />
);

export default CustomToastContainer;