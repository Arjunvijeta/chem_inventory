import React, { useState, useMemo, useEffect } from "react";
import { BiSearch } from "react-icons/bi";

const columns = [
  { id: "name", label: "Name" },
  { id: "department", label: "Department" },
  { id: "action", label: "Action" },
];

const initialRows = [
  { name: "Alice", department: "Chemistry" },
  { name: "Bob", department: "Physics" },
  { name: "Charlie", department: "Biology" },
  { name: "David", department: "Engineering" },
  { name: "Eve", department: "Mathematics" },
  { name: "Frank", department: "IT" },
  { name: "Grace", department: "Admin" },
];

const Administrator = ({ onClose }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [tableOpen, setTableOpen] = useState({ addUser: false });
  const [rows, setRows] = useState(initialRows);
  const [form, setForm] = useState({
    name: "",
    department: "",
    role: "",
    password: "",
  });

  const handleClose = () => {
    setTableOpen({ addUser: false });
  };

  const handleOpen = (tab) => {
    setTableOpen({ ...tableOpen, [tab]: true });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setRows([...rows, { name: form.name, department: form.department }]);
    setForm({ name: "", department: "", role: "", password: "" });
    handleClose();
  };

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    const searchLower = searchText.toLowerCase();
    return rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchLower) ||
        row.department.toLowerCase().includes(searchLower)
      );
    });
  }, [searchText, rows]);

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
          Administrator
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
          <button
            className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300"
            onClick={() => handleOpen("addUser")}
          >
            Add User
          </button>
          {tableOpen.addUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative bg-white rounded-lg shadow-lg p-6 w-full md:w-[40vw] overflow-auto flex flex-col items-center">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black focus:outline-none"
                  aria-label="Close"
                >
                  ×
                </button>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800 w-full">
                  Add User
                </h2>
                <form
                  className="w-full flex flex-col gap-4"
                  onSubmit={handleSave}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleFormChange}
                    className="w-full pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    required
                  />
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleFormChange}
                    className="w-full pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    required
                  />
                  <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={form.role}
                    onChange={handleFormChange}
                    className="w-full pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleFormChange}
                    className="w-full pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                  >
                    Add
                  </button>
                </form>
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
                  <td className="pl-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {row.name}
                  </td>
                  <td className="pl-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {row.department}
                  </td>
                  <td className="pl-4 py-2 whitespace-nowrap text-sm text-gray-700 flex gap-2">
                    <button className="text-blue-600 hover:underline text-xs">
                      View
                    </button>
                    <button className="text-green-600 hover:underline text-xs">
                      Edit
                    </button>
                  </td>
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

export default Administrator;
