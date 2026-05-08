import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);
  }, []);

  const role = user?.role;

  return (
    <div className="dashboard-main">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <h2 className="sidebar-title">
          {role?.toUpperCase()} DASHBOARD
        </h2>

        <nav className="sidebar-nav">

          {/* ================= ADMIN ================= */}
          {role === "admin" && (
            <>
              <Link
                className="sidebar-link"
                to="/dashboard/manage-users"
              >
                Manage Users
              </Link>

              <Link
                className="sidebar-link"
                to="/dashboard/all-products"
              >
                All Products
              </Link>

              <Link
                className="sidebar-link"
                to="/dashboard/all-orders"
              >
                All Orders
              </Link>
            </>
          )}

          {/* ================= MANAGER ================= */}
          {role === "manager" && (
            <>
              <Link
                className="sidebar-link"
                to="/dashboard/add-product"
              >
                Add Product
              </Link>

              <Link
                className="sidebar-link"
                to="/dashboard/manage-products"
              >
                Manage Products
              </Link>

              <Link
                className="sidebar-link"
                to="/dashboard/pending-orders"
              >
                Pending Orders
              </Link>

              <Link
                className="sidebar-link"
                to="/dashboard/approved-orders"
              >
                Approved Orders
              </Link>
            </>
          )}

          {/* ================= BUYER ================= */}
          {role === "buyer" && (
            <>
              <Link
                className="sidebar-link"
                to="/dashboard/my-orders"
              >
                My Orders
              </Link>

              <Link
                className="sidebar-link"
                to="/dashboard/track-order"
              >
                Track Order
              </Link>
            </>
          )}

          {/* ================= COMMON ================= */}
          <Link
            className="sidebar-link"
            to="/dashboard/profile"
          >
            My Profile
          </Link>

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