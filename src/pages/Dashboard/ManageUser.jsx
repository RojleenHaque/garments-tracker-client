import { useState } from 'react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Challenge Requirement 1 [cite: 241]

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
        // Collect reason & feedback (Challenge Requirement 4) [cite: 242]
        console.log("Suspended for:", result.value);
        Swal.fire('Suspended!', 'User has been restricted.', 'success');
      }
    });
  };

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
            {/* Example row based on requirements [cite: 136] */}
            <tr>
              <td>John Doe</td>
              <td>john@garments.com</td>
              <td><span className="badge">Buyer</span></td>
              <td>
                <button className="btn-edit">Update Role</button>
                <button 
                  className="btn-delete" 
                  onClick={() => handleSuspend({name: "John Doe"})}
                >
                  Suspend
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;