import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Profile = ({ onClose }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "user",
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...form });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.id]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log({ ...form, ...passwords });
    setShowPasswordModal(false);
    setPasswords({ oldPassword: "", newPassword: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 md:p-10 w-full md:w-[70vw] h-auto md:h-[80vh] flex flex-col items-center overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black focus:outline-none"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center w-full">
          Profile
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
            <div className="flex-1 flex flex-col">
              <label htmlFor="name" className="font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="email" className="font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                disabled
                className="p-2 border border-gray-300 rounded-md bg-zinc-100 focus:outline-black"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
            <div className="flex-1 flex flex-col">
              <label htmlFor="department" className="font-medium mb-1">
                Department
              </label>
              <input
                type="text"
                id="department"
                value={form.department}
                onChange={handleChange}
                className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="role" className="font-medium mb-1">
                Role
              </label>
              <select
                name="role"
                id="role"
                value={form.role}
                onChange={handleChange}
                disabled
                className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 bg-primary-100 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
              <FaChevronDown className="w-4 h-4 pl-1" />
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:scale-105 transition-all duration-300"
            >
              Save
            </button>
          </div>
        </form>
        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center relative">
              <button
                className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black focus:outline-none"
                aria-label="Close"
                onClick={() => setShowPasswordModal(false)}
              >
                ×
              </button>
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <form
                onSubmit={handlePasswordSubmit}
                className="flex flex-col gap-4 w-full"
              >
                <div className="flex flex-col">
                  <label htmlFor="oldPassword" className="font-medium mb-1">
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                    className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="newPassword" className="font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-100 text-white px-4 py-2 rounded-md hover:scale-105 transition-all duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
