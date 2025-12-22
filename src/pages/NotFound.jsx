import { Link } from 'react-router-dom';


const NotFound = () => (
  <div className="notfound-container">
    <h1>404</h1>
    <p>The page you are looking for doesn't exist.</p>
    <Link to="/" className="btn-primary">Go Back Home</Link>
  </div>
);

export default NotFound;
