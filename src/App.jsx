import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoutes from "./components/PrivateRoutes";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

// Dashboard
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

import ManageUsers from "./pages/Dashboard/ManageUsers";
import AllOrders from "./pages/Dashboard/AllOrders";
import AddProduct from "./pages/Dashboard/AddProduct";
import ManageProducts from "./pages/Dashboard/ManageProducts";
import PendingOrders from "./pages/Dashboard/PendingOrders";
import ApprovedOrders from "./pages/Dashboard/ApprovedOrders";
import TrackOrder from "./pages/Dashboard/TrackOrder";
import MyOrders from "./pages/Dashboard/MyOrders";
import Profile from "./pages/Dashboard/Profile";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* PRIVATE ROUTES (USER MUST LOGIN) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/booking/:id" element={<Booking />} />

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            
            {/* USER */}
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="profile" element={<Profile />} />

            {/* ADMIN + MANAGER */}
            <Route path="all-products" element={<AllProducts />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="all-orders" element={<AllOrders />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="pending-orders" element={<PendingOrders />} />
            <Route path="approved-orders" element={<ApprovedOrders />} />
            <Route path="track-order/:id" element={<TrackOrder />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;