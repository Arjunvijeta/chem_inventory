import React, { useState } from "react";

const AddContainer = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-[70vw] h-[80vh] flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default AddContainer;
