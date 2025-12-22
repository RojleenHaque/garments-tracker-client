import { useNavigate } from "react-router-dom";


const Profile = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
      <button onClick={handleLogout} className="btn-primary">Logout</button>
    </div>
  );
};

export default Profile;
