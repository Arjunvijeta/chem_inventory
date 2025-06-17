import React, { useState, useMemo, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { orderAPI } from "../../services/api";

const columns = [
  { id: "chemicalName", label: "Chemical name" },
  { id: "contact", label: "Contact" },
  { id: "creation_date", label: "Creation date" },
  { id: "comment", label: "Comment" },
  { id: "status", label: "Status" },
];

const Request = ({ onClose }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderAPI.getAll();
        setOrders(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText) return orders;
    const searchLower = searchText.toLowerCase();
    return orders.filter((order) => {
      return columns.some((column) => {
        const value = order[column.id];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [orders, searchText]);

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
            Requested chemicals
          </h2>
          <div className="flex items-center justify-center h-full">
            <div className="text-xl text-gray-600">Loading orders...</div>
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
          Requested chemicals
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
              {paginatedRows.map((order, index) => (
                <tr
                  key={order.id || index}
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
                      className="pl-4 py-2 whitespace-nowrap text-sm text-gray-700"
                    >
                      {order[column.id] || "-"}
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

export default Request;
