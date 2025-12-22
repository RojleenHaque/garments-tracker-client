import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // store fetched users
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Replace with your backend endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire('Error', 'Failed to fetch users.', 'error');
      }
    };
    fetchUsers();
  }, []);

  const handleSuspend = (user) => {
    Swal.fire({
      title: `Suspend ${user.name}?`,
      input: 'textarea',
      inputLabel: 'Reason for suspension',
      inputPlaceholder: 'Enter the feedback for the user...',
      showCancelButton: true,
      confirmButtonText: 'Confirm Suspension',
      confirmButtonColor: '#e53e3e',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        // Send suspension reason to backend
        axios.post(`/api/users/${user.id}/suspend`, { reason: result.value })
          .then(() => {
            Swal.fire('Suspended!', 'User has been restricted.', 'success');
          })
          .catch(() => {
            Swal.fire('Error', 'Failed to suspend the user.', 'error');
          });
      }
    });
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-users-container">
      <div className="dashboard-header">
        <h2>Manage Users</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          className="form-control search-bar"
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="badge">{user.role}</span></td>
                  <td>
                    <button className="btn-edit">Update Role</button>
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
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
