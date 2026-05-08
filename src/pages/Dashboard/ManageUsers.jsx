import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");

        // IMPORTANT: ensure array
        const data = Array.isArray(res.data) ? res.data : [];

        setUsers(data);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to fetch users", "error");
      }
    };

    fetchUsers();
  }, []);

  const handleSuspend = async (user) => {
    const result = await Swal.fire({
      title: `Suspend ${user.name}?`,
      input: "textarea",
      inputLabel: "Reason",
      showCancelButton: true,
      confirmButtonText: "Suspend",
    });

    if (result.isConfirmed && result.value) {
      try {
        await axios.patch(
          `http://localhost:5000/users/${user._id}`,
          {
            status: "suspended",
            reason: result.value,
          }
        );

        Swal.fire("Success", "User suspended", "success");

        // refresh users
        setUsers((prev) =>
          prev.map((u) =>
            u._id === user._id ? { ...u, status: "suspended" } : u
          )
        );
      } catch (err) {
        Swal.fire("Error", "Failed to suspend user", "error");
      }
    }
  };

  const filteredUsers = (users || []).filter((user) => {
    return (
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="manage-users-container">
      <div className="dashboard-header">
        <h2>Manage Users</h2>

        <input
          type="text"
          placeholder="Search users..."
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>

                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleSuspend(user)}
                    >
                      Suspend
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;