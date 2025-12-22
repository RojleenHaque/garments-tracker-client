import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import AllProducts from './pages/AllProducts';
import DashboardLayout from './pages/Dashboard/DashboardLayout';

function App() {
  const user = null; // Replace with actual Auth state
  const role = 'admin'; // Replace with user.role from DB

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<h1 style={{padding: '5%'}}>Welcome to GarmentsFlow Hero Banner</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<AllProducts products={[]} />} />
          
          {/* Dashboard Nested Routes [cite: 126, 164] */}
          <Route path="/dashboard" element={<DashboardLayout role={role} />}>
            <Route path="manage-users" element={<div>Admin User Management Table</div>} />
            <Route path="add-product" element={<div>Manager Add Product Form</div>} />
            <Route path="profile" element={<div>User Profile Info</div>} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;