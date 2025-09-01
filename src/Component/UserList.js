import React from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="4">No Users Found</td></tr>
        )}
      </tbody>
    </table>
  );
};

export default UserList;
