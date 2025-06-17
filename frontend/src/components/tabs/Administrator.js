import React, { useState, useMemo, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { userAPI, departmentAPI } from "../../services/api";

const columns = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "department", label: "Department" },
  { id: "role", label: "Role" },
];

const Administrator = ({ onClose }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [tableOpen, setTableOpen] = useState({ addUser: false });
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department_id: "",
    role: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);

  // Fetch users and departments from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersData, departmentsData] = await Promise.all([
          userAPI.getAll(),
          departmentAPI.getAll(),
        ]);
        setUsers(usersData);
        setDepartments(departmentsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Refresh users after adding new one
  const refreshUsers = async () => {
    try {
      const data = await userAPI.getAll();
      setUsers(data);
    } catch (err) {
      console.error("Error refreshing users:", err);
    }
  };

  const handleClose = () => {
    setTableOpen({ addUser: false });
    setForm({ name: "", email: "", department_id: "", role: "", password: "" });
  };

  const handleOpen = (tab) => {
    setTableOpen({ ...tableOpen, [tab]: true });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const userData = {
        name: form.name,
        email: form.email,
        department_id: parseInt(form.department_id),
        role: form.role,
        password: form.password,
      };

      await userAPI.create(userData);
      setForm({
        name: "",
        email: "",
        department_id: "",
        role: "",
        password: "",
      });
      handleClose();
      refreshUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to create user: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText) return users;
    const searchLower = searchText.toLowerCase();
    return users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.department?.name?.toLowerCase().includes(searchLower) ||
        user.role?.toLowerCase().includes(searchLower)
      );
    });
  }, [searchText, users]);

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
            Administrator
          </h2>
          <div className="flex items-center justify-center h-full">
            <div className="text-xl text-gray-600">Loading users...</div>
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
          Administrator
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
                    disabled={saving}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleFormChange}
                    className="w-full pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    required
                    disabled={saving}
                  />
                  <select
                    name="department_id"
                    value={form.department_id}
                    onChange={handleFormChange}
                    className="w-full pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    required
                    disabled={saving}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleFormChange}
                    className="w-full pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    required
                    disabled={saving}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                  </select>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleFormChange}
                    className="w-full pl-4 pr-4 py-2 text-gray-600 rounded-lg border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    required
                    disabled={saving}
                  />
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Adding..." : "Add"}
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
              {paginatedRows.map((user, index) => (
                <tr
                  key={user.id || index}
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
                    {user.name || "-"}
                  </td>
                  <td className="pl-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {user.email || "-"}
                  </td>
                  <td className="pl-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {user.department?.name || "-"}
                  </td>
                  <td className="pl-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {user.role || "-"}
                  </td>
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

export default Administrator;
