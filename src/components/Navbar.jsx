import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
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
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={onLogout} className="btn-logout">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;