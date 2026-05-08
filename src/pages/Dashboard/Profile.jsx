import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <button onClick={handleLogout} className="btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Profile;
