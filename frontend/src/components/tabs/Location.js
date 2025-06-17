import React, { useState, useMemo, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { locationAPI } from "../../services/api";

const columns = [
  { id: "building", label: "Building" },
  { id: "room", label: "Room" },
  { id: "shelf", label: "Shelf" },
];

const Location = ({ onClose }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableOpen, setTableOpen] = useState({
    addLocation: false,
  });
  const [newLocation, setNewLocation] = useState({
    building: "",
    room: "",
    shelf: "",
  });
  const [saving, setSaving] = useState(false);

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const data = await locationAPI.getAll();
        setLocations(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Refresh locations after adding new one
  const refreshLocations = async () => {
    try {
      const data = await locationAPI.getAll();
      setLocations(data);
    } catch (err) {
      console.error("Error refreshing locations:", err);
    }
  };

  const handleClose = () => {
    setTableOpen({ addLocation: false });
    setNewLocation({ building: "", room: "", shelf: "" });
  };

  const handleOpen = (tab) => {
    setTableOpen({ ...tableOpen, [tab]: true });
  };

  const handleSave = async () => {
    if (!newLocation.building || !newLocation.room || !newLocation.shelf) {
      alert("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      await locationAPI.create(newLocation);
      setNewLocation({ building: "", room: "", shelf: "" });
      handleClose();
      refreshLocations();
    } catch (err) {
      console.error("Error creating location:", err);
      alert("Failed to create location: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleNewLocationChange = (e) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText) return locations;
    const searchLower = searchText.toLowerCase();
    return locations.filter((location) => {
      return columns.some((column) => {
        const value = location[column.id];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [locations, searchText]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Reset page when search changes
  useEffect(() => {
    setPage(0);
  }, [searchText]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
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
            Location
          </h2>
          <div className="flex items-center justify-center h-full">
            <div className="text-xl text-gray-600">Loading locations...</div>
          </div>
        </div>
      </div>
    );
  }

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
          Location
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full">
            {error}
          </div>
        )}

        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2 px-2">
          <div className="relative flex items-center w-full md:w-auto">
            <div className="absolute left-3">
              <BiSearch className="text-gray-400 text-xl" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full md:w-auto pl-10 pr-4 py-1 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-400"
            />
          </div>
          <button
            className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300"
            onClick={() => handleOpen("addLocation")}
          >
            Add Location
          </button>
          {tableOpen.addLocation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative bg-white rounded-lg shadow-lg p-6 w-full md:w-[70vw] overflow-auto h-[80vh] flex flex-col items-center">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black focus:outline-none"
                  aria-label="Close"
                >
                  ×
                </button>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800 w-full">
                  Add Location
                </h2>
                <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2 px-2">
                  <div className="relative flex flex-col md:flex-row items-center w-full md:w-auto gap-2">
                    <input
                      type="text"
                      name="building"
                      placeholder="Building"
                      value={newLocation.building}
                      onChange={handleNewLocationChange}
                      className="w-full md:w-auto pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      required
                      disabled={saving}
                    />
                    <input
                      type="text"
                      name="room"
                      placeholder="Room"
                      value={newLocation.room}
                      onChange={handleNewLocationChange}
                      className="w-full md:w-auto pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      required
                      disabled={saving}
                    />
                    <input
                      type="text"
                      name="shelf"
                      placeholder="Shelf"
                      value={newLocation.shelf}
                      onChange={handleNewLocationChange}
                      className="w-full md:w-auto pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      required
                      disabled={saving}
                    />
                    <button
                      className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? "Adding..." : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full h-[60vh] flex flex-col justify-between overflow-y-auto rounded-lg bg-zinc-100 border border-gray-200">
          <table className="w-full text-gray-600">
            <thead className="bg-primary-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-primary-100">
                  #
                </th>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className="px-4 py-3 text-left text-sm font-bold text-primary-100"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedRows.map((location, index) => (
                <tr
                  key={location.id || index}
                  className={
                    index % 2 === 0
                      ? "hover:bg-zinc-200 transition-all duration-300"
                      : "bg-gray-100 hover:bg-zinc-200 transition-all duration-300"
                  }
                >
                  <td className="pl-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {page * rowsPerPage + index + 1}
                  </td>
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
                    >
                      {location[column.id] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => handleChangePage(page + 1)}
              disabled={page >= totalPages - 1}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
