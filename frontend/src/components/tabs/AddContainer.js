import React, { useState } from "react";
import { chemicalCatalogueAPI } from "../../services/api";

const AddContainer = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    chemicalName: "",
    CAS: "",
    Barcode: "",
    Quantity: "",
    Unit: "",
    Supplier: "",
    PurchaseDate: "",
    ExpiryDate: "",
    LocationBuilding: "",
    LocationRoom: "",
    LocationShelf: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Transform form data to match API schema
      const chemicalData = {
        chemical_name: form.chemicalName,
        cas_number: form.CAS,
        barcode: form.Barcode || null,
        quantity: form.Quantity ? parseFloat(form.Quantity) : null,
        unit: form.Unit || null,
        supplier: form.Supplier || null,
        purchase_date: form.PurchaseDate || null,
        expiry_date: form.ExpiryDate || null,
        location_building: form.LocationBuilding || null,
        location_room: form.LocationRoom || null,
        location_shelf: form.LocationShelf || null,
        comment: form.comment || null,
      };

      await chemicalCatalogueAPI.create(chemicalData);

      // Reset form
      setForm({
        chemicalName: "",
        CAS: "",
        Barcode: "",
        Quantity: "",
        Unit: "",
        Supplier: "",
        PurchaseDate: "",
        ExpiryDate: "",
        LocationBuilding: "",
        LocationRoom: "",
        LocationShelf: "",
        comment: "",
      });

      // Call success callback to refresh the table
      if (onSuccess) {
        onSuccess();
      }

      // Close the modal
      onClose();
    } catch (err) {
      console.error("Error creating chemical:", err);
      setError(err.message || "Failed to create chemical");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full md:w-[70vw] h-[80vh] flex flex-col justify-between">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800 w-full">
          Add Container
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full md:px-8  overflow-y-auto h-[75vh]"
        >
          <div className="flex flex-col gap-2 md:gap-4 w-full">
            <div className="flex-1 flex flex-col text-gray-600">
              <label htmlFor="chemicalName" className="font-medium mb-1">
                Chemical Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="chemicalName"
                value={form.chemicalName}
                onChange={handleChange}
                className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                required
                disabled={loading}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
              <div className="flex-1 flex flex-col text-gray-600">
                <label htmlFor="CAS" className="font-medium mb-1">
                  CAS <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="CAS"
                  value={form.CAS}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex-1 flex flex-col text-gray-600">
                <label htmlFor="Barcode" className="font-medium mb-1">
                  Barcode
                </label>
                <input
                  type="text"
                  id="Barcode"
                  value={form.Barcode}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
              <div className="flex-1 flex flex-col text-gray-600">
                <label htmlFor="Quantity" className="font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="Quantity"
                  value={form.Quantity}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                  disabled={loading}
                />
              </div>
              <div className="flex-1 flex flex-col text-gray-600">
                <label htmlFor="Unit" className="font-medium mb-1">
                  Unit
                </label>

                <select
                  name="Unit"
                  id="Unit"
                  value={form.Unit}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                  disabled={loading}
                >
                  <option value="">Select Unit</option>
                  <option value="ml">ml</option>
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col text-gray-600">
                <label htmlFor="Supplier" className="font-medium mb-1">
                  Supplier
                </label>
                <input
                  list="suppliers"
                  id="Supplier"
                  value={form.Supplier}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                  disabled={loading}
                />
                <datalist id="suppliers">
                  <option value="Supplier 1">Supplier 1</option>
                  <option value="Supplier 2">Supplier 2</option>
                  <option value="Supplier 3">Supplier 3</option>
                </datalist>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
              <div className="flex-1 flex flex-col text-gray-600">
                <label htmlFor="LocationBuilding" className="font-medium mb-1">
                  Location Building
                </label>
                <input
                  type="text"
                  id="LocationBuilding"
                  value={form.LocationBuilding}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                  disabled={loading}
                />
              </div>
              <div className="flex-1 flex flex-col text-gray-600">
                <label htmlFor="LocationRoom" className="font-medium mb-1">
                  Location Room
                </label>
                <input
                  type="text"
                  id="LocationRoom"
                  value={form.LocationRoom}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                  disabled={loading}
                />
              </div>
              <div className="flex-1 flex flex-col text-gray-600  ">
                <label htmlFor="LocationShelf" className="font-medium mb-1">
                  Location Shelf
                </label>
                <input
                  type="text"
                  id="LocationShelf"
                  value={form.LocationShelf}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
              <div className="flex-1 flex flex-col text-gray-600">
                <label htmlFor="PurchaseDate" className="font-medium mb-1">
                  Purchase Date
                </label>
                <input
                  type="date"
                  id="PurchaseDate"
                  value={form.PurchaseDate}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                  disabled={loading}
                />
              </div>
              <div className="flex-1 flex flex-col text-gray-600">
                <label htmlFor="ExpiryDate" className="font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  id="ExpiryDate"
                  value={form.ExpiryDate}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
                <div className="flex-1 flex flex-col text-gray-600">
                  <label htmlFor="comment" className="font-medium ">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    value={form.comment}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-100 text-white px-4 py-2 mt-4 rounded-md hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContainer;
