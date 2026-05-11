import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setLoading(false);
  }, []);

  const role = user?.role;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please login to access dashboard</div>;
  }

  return (
    <div className="dashboard-main">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <h2 className="sidebar-title">
          {role?.toUpperCase()} DASHBOARD
        </h2>

        <nav className="sidebar-nav">

          {/* ADMIN */}
          {role === "admin" && (
            <>
              <Link to="/dashboard/manage-users">Manage Users</Link>
              <Link to="/dashboard/all-products">All Products</Link>
              <Link to="/dashboard/all-orders">All Orders</Link>
            </>
          )}

          {/* MANAGER */}
          {role === "manager" && (
            <>
              <Link to="/dashboard/add-product">Add Product</Link>
              <Link to="/dashboard/manage-products">Manage Products</Link>
              <Link to="/dashboard/pending-orders">Pending Orders</Link>
              <Link to="/dashboard/approved-orders">Approved Orders</Link>
            </>
          )}

          {/* BUYER */}
          {role === "buyer" && (
            <>
              <Link to="/dashboard/my-orders">My Orders</Link>
              <Link to="/dashboard/track-order">Track Order</Link>
            </>
          )}

          {/* COMMON */}
          <Link to="/dashboard/profile">My Profile</Link>

        </nav>
      </aside>

      {/* CONTENT */}
      <main className="dashboard-content">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;