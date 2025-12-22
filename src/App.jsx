import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllProducts from './pages/AllProducts';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  // Use state for user authentication
  const [user, setUser] = useState(null); 
  const role = user?.role || 'admin'; // get role from user object if exists

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <div className="min-h-screen">
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Home />} />

          {/* Authentication */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Products */}
          <Route path="/products" element={<AllProducts products={[]} />} />
          <Route path="/product/:id" element={<div>Product Details Page</div>} />

          {/* Dashboard (nested routes) */}
          <Route path="/dashboard" element={<DashboardLayout role={role} />}>
            <Route index element={<div>Dashboard Home</div>} />
            <Route path="manage-users" element={<div>Admin User Management Table</div>} />
            <Route path="add-product" element={<div>Manager Add Product Form</div>} />
            <Route path="profile" element={<div>User Profile Info</div>} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
