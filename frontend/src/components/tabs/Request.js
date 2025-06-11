import React, { useState, useMemo, useEffect } from "react";
import { BiSearch } from "react-icons/bi";

const columns = [
  { id: "chemicalName", label: "Chemical name" },
  { id: "contact", label: "Contact" },
  { id: "creation_date", label: "Creation date" },
  { id: "comment", label: "Comment" },
  { id: "status", label: "Status" },
];

const rows = [
  {
    chemicalName: "Acetone",
    contact: "user1@example.com",
    creation_date: "2023-01-01",
    comment: "Urgent",
    status: "Pending",
  },
  {
    chemicalName: "Ethanol",
    contact: "user2@example.com",
    creation_date: "2023-01-02",
    comment: "Regular",
    status: "Approved",
  },
  {
    chemicalName: "Methanol",
    contact: "user3@example.com",
    creation_date: "2023-01-03",
    comment: "Urgent",
    status: "Rejected",
  },
  {
    chemicalName: "Benzene",
    contact: "user4@example.com",
    creation_date: "2023-01-04",
    comment: "Regular",
    status: "Pending",
  },
  {
    chemicalName: "Toluene",
    contact: "user5@example.com",
    creation_date: "2023-01-05",
    comment: "Urgent",
    status: "Approved",
  },
  {
    chemicalName: "Xylene",
    contact: "user6@example.com",
    creation_date: "2023-01-06",
    comment: "Regular",
    status: "Rejected",
  },
  {
    chemicalName: "Acetone",
    contact: "user7@example.com",
    creation_date: "2023-01-07",
    comment: "Urgent",
    status: "Pending",
  },
  {
    chemicalName: "Ethanol",
    contact: "user8@example.com",
    creation_date: "2023-01-08",
    comment: "Regular",
    status: "Approved",
  },
  {
    chemicalName: "Methanol",
    contact: "user9@example.com",
    creation_date: "2023-01-09",
    comment: "Urgent",
    status: "Rejected",
  },
  {
    chemicalName: "Benzene",
    contact: "user10@example.com",
    creation_date: "2023-01-10",
    comment: "Regular",
    status: "Pending",
  },
  {
    chemicalName: "Toluene",
    contact: "user11@example.com",
    creation_date: "2023-01-11",
    comment: "Urgent",
    status: "Approved",
  },
  {
    chemicalName: "Xylene",
    contact: "user12@example.com",
    creation_date: "2023-01-12",
    comment: "Regular",
    status: "Rejected",
  },
];

const Request = ({ onClose }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    const searchLower = searchText.toLowerCase();
    return rows.filter((row) => {
      return columns.some((column) => {
        const value = row[column.id];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [searchText]);

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
              {paginatedRows.map((row, index) => (
                <tr
                  key={index}
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
                      {row[column.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex items-end justify-end px-4 py-2 bg-white border-t border-gray-200 w-full">
            <div className="flex items-center gap-2">
              <span className="md:text-sm text-xs text-gray-700">
                Rows per page:
              </span>
              <select
                className="border border-gray-300 text-gray-600 rounded px-2 py-1 md:text-sm text-xs focus:outline-none"
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
              >
                {[5, 10, 25].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                className="px-2 py-1 md:text-sm text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
                onClick={() => handleChangePage(page - 1)}
                disabled={page === 0}
              >
                Previous
              </button>
              <span className="md:text-sm text-xs text-gray-700">
                Page {page + 1} of {totalPages}
              </span>
              <button
                className="px-2 py-1 md:text-sm text-xs  text-gray-500 hover:text-gray-700 disabled:opacity-50"
                onClick={() => handleChangePage(page + 1)}
                disabled={page >= totalPages - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
