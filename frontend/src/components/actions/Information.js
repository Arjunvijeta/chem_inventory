import React from "react";

const Information = ({ chemical, onClose }) => {
  const chemicalData = [
    { label: "Chemical Name", value: chemical?.chemicalName || "N/A" },
    { label: "Quantity", value: chemical?.quantity || "N/A" },
    { label: "Location", value: chemical?.location || "N/A" },
    { label: "CAS Number", value: chemical?.CAS || "N/A" },
    { label: "Barcode", value: chemical?.barcode || "N/A" },
  ];

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
          Chemical Information
        </h2>

        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-primary-700 px-6 py-4">
              <h3 className="text-xl font-semibold text-primary-100">
                {chemical?.chemicalName || "Chemical Details"}
              </h3>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chemicalData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {item.label}
                    </label>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-900 font-medium">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Information Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Additional Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Safety Information
                    </label>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-900">
                        Safety data available upon request
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Storage Conditions
                    </label>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-900">
                        Store in a cool, dry place
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
