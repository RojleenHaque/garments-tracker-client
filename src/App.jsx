import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllProducts from './pages/AllProducts'; // public page
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Booking from './pages/Booking';
import Profile from './pages/Dashboard/Profile';

// Dashboard pages
import ManageUsers from './pages/Dashboard/ManageUsers';
import AllOrders from './pages/Dashboard/AllOrders';
import AddProduct from './pages/Dashboard/AddProduct';
import ManageProducts from './pages/Dashboard/ManageProducts';
import PendingOrders from './pages/Dashboard/PendingOrders';
import ApprovedOrders from './pages/Dashboard/ApprovedOrders';

import './App.css';

function App() {
  const [user, setUser] = useState(null); 

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/booking/:id" element={<Booking user={user} />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout role={user?.role} />}>
            {/* Admin Dashboard */}
            {user?.role === "admin" && (
              <>
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="all-products" element={<AllProducts />} />
                <Route path="all-orders" element={<AllOrders />} />
              </>
            )}

            {/* Manager Dashboard */}
            {user?.role === "manager" && (
              <>
                <Route path="add-product" element={<AddProduct />} />
                <Route path="manage-products" element={<ManageProducts />} />
                <Route path="pending-orders" element={<PendingOrders />} />
                <Route path="approved-orders" element={<ApprovedOrders />} />
              </>
            )}

            {/* Common for all roles */}
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
