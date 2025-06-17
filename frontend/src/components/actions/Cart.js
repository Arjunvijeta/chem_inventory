import React, { useState } from "react";

const Cart = ({ chemical, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [comment, setComment] = useState("");

  const handleSend = () => {
    console.log("Sending cart request:", {
      chemical: chemical,
      date: selectedDate,
      comment: comment,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full md:w-[70vw] overflow-auto h-[80vh] flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800 w-full">
          Add to Cart
        </h2>

        <div className="w-full max-w-2xl space-y-6">
          {/* Chemical Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Chemical Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chemical Name
                </label>
                <div className="p-2 bg-white border border-gray-300 rounded-md text-gray-900">
                  {chemical?.chemicalName || "N/A"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="p-2 bg-white border border-gray-300 rounded-md text-gray-900">
                  {chemical?.location || "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Date *
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Comment Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add any additional comments or special requirements..."
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 resize-none"
            />
          </div>

          {/* Send Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSend}
              disabled={!selectedDate}
              className="bg-primary-100 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
