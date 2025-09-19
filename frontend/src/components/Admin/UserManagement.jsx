import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ✅ Import actions from adminSlice
import { addUser, updateUser, deleteUser, fetchUsers } from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchUsers()); // ✅ load users when admin opens page
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if(user && user.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [user, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [editingUser, setEditingUser] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Add or Update User
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      dispatch(updateUser({ 
        id: editingUser._id,   // ✅ match adminSlice
        name: formData.name,
        email: formData.email,
        role: formData.role 
      }));
    } else {
      dispatch(addUser(formData));
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
    setEditingUser(null);
  };

  // ✅ Edit User (populate form)
  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // don't prefill password
      role: user.role,
    });
  };

  // ✅ Delete User
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  // ✅ Handle role change inline
  const handleRoleChange = (id, newRole) => {
    dispatch(updateUser({ id, role: newRole }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      {loading && <p className="text-center py-8 text-gray-500">Loading users...</p>}
      {error && <p className="text-center py-8 text-red-500">Error: {error}</p>}

      {/* Add/Edit User Form */}
      <div className="p-6 rounded-lg mb-6 bg-white shadow">
        <h3 className="text-lg font-bold mb-6">
          {editingUser ? "Edit User" : "Add New User"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {!editingUser && (
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className={`${
              editingUser ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
            } text-white py-2 px-4 rounded`}
          >
            {editingUser ? "Update User" : "Add User"}
          </button>
          {editingUser && (
            <button
              type="button"
              onClick={() => {
                setEditingUser(null);
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  role: "customer",
                });
              }}
              className="ml-2 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* User List Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id || u.email} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 ">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleEditUser(u)}
                    className="text-white bg-blue-500 hover:bg-blue-600 mr-2 rounded py-1 px-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    className="text-white bg-red-500 hover:bg-red-600 rounded py-1 px-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
