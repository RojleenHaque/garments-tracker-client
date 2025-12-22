import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = ({ role }) => {
  return (
    <div className="dashboard-main">
      <aside className="sidebar">
        <h3>Dashboard</h3>
        <nav>
          {role === 'admin' && (
            <>
              <Link className="sidebar-link" to="/dashboard/manage-users">Manage Users</Link>
              <Link className="sidebar-link" to="/dashboard/all-orders">All Orders</Link>
            </>
          )}
          {role === 'manager' && (
            <>
              <Link className="sidebar-link" to="/dashboard/add-product">Add Product</Link>
              <Link className="sidebar-link" to="/dashboard/manage-products">Manage Products</Link>
            </>
          )}
          <Link className="sidebar-link" to="/dashboard/profile">My Profile</Link>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet /> {/* This renders the specific dashboard sub-pages [cite: 44] */}
      </main>
    </div>
  );
};

export default DashboardLayout;