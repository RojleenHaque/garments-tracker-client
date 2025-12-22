import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user (auth state or JWT cookie)
    setUser(null); 
    // Optionally clear JWT cookie/localStorage
    localStorage.removeItem('token'); 
    navigate('/'); // Go to Home
  };

  return (
    <nav className="navbar">
      <div className="logo"><h2>GarmentsFlow</h2></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">All Products</Link></li>
        <li><Link to="/about">About Us</Link></li>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li style={{ fontWeight: 'bold', color: '#f85f73' }}>
              Hello, {user.name}!
            </li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
