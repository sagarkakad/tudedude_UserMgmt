import React, {  useEffect, useState } from "react";
import api from "./webApi";
import UserList from "./Component/UserList";
import UserForm from "./Component/UserForm";
import Loader from "./Component/Loader";
import "./index.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await api.post("/users", user);
      setUsers([...users, { ...user, id: response.data.id || Date.now() }]);
    } catch {
      alert("Failed to add user");
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      await api.put(`/users/${editingUser.id}`, updatedUser);
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...updatedUser } : u)));
      setEditingUser(null);
    } catch {
      alert("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch {
      alert("Failed to delete user");
    }
  };



  return (
    <div className="app">
      <div className="app">
      <h1>User Management App</h1>
      <UserForm
        onSubmit={editingUser ? updateUser : addUser}
        editingUser={editingUser}
        cancelEdit={() => setEditingUser(null)}
      />
      {loading ? (
        <Loader />
      ) : (
        <UserList users={users} onEdit={setEditingUser} onDelete={deleteUser} />
      )}
    </div>
    </div>
  );
};

export default App;
