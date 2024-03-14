"use client";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const WarningScreen = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOutsideClick}>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md border-4 border-red-500 ring-4 ring-red-500 ring-opacity-50">
            <button className="absolute top-0 right-0 mt-2 mr-2 text-white text-2xl" onClick={handleClose}>
              &times;
            </button>
            <p className="text-white text-lg text-center">Bullying Detected!<br></br>
            Please refrain from making any offensive comment
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const App = () => {
  const handleCloseApp = () => {
    // Add your logic to close the application here
    console.log('Closing the application...');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">My Application</h1>
      <WarningScreen onClose={handleCloseApp} />
    </div>
  );
};

export default WarningScreen;
