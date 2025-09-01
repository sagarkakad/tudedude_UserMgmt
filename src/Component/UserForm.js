import React, { useState, useEffect } from "react";

const UserForm = ({ onSubmit, editingUser, cancelEdit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", username: "" });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        username: editingUser.username,
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.username) {
      alert("All fields are required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Invalid email format!");
      return;
    }
    onSubmit(formData);
    setFormData({ name: "", email: "", username: "" });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Enter Username"
        value={formData.username}
        onChange={handleChange}
      />
      <div className="form-actions">
        <button type="submit">{editingUser ? "Update" : "Add"}</button>
        {editingUser && <button type="button" onClick={cancelEdit}>Cancel</button>}
      </div>
    </form>
  );
};

export default UserForm;
