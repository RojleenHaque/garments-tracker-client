import { Link, Outlet } from 'react-router-dom';


const DashboardLayout = ({ role }) => {
  return (
    <div className="dashboard-main">
      <aside className="sidebar">
        <h3 className="sidebar-title">Dashboard</h3>
        <nav className="sidebar-nav">
          {role === 'manager' && (
            <>
              <Link className="sidebar-link" to="/dashboard/add-product">Add Product</Link>
              <Link className="sidebar-link" to="/dashboard/manage-products">Manage Products</Link>
              <Link className="sidebar-link" to="/dashboard/pending-orders">Pending Orders</Link>
              <Link className="sidebar-link" to="/dashboard/approved-orders">Approved Orders</Link>
            </>
          )}
          {role === 'admin' && (
  <>
    <Link className="sidebar-link" to="/dashboard/manage-users">Manage Users</Link>
    <Link className="sidebar-link" to="/dashboard/all-products">All Products</Link>
    <Link className="sidebar-link" to="/dashboard/all-orders">All Orders</Link>
  </>
)}

          <Link className="sidebar-link" to="/dashboard/profile">My Profile</Link>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
