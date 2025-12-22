import React, { useState, useEffect } from "react";
import axios from "axios";


const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState(""); // Pending / Approved / Rejected

  useEffect(() => {
    axios.get("http://localhost:5000/orders/all", { withCredentials: true })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredOrders = filter ? orders.filter(o => o.status === filter) : orders;

  return (
    <div className="table-container">
      <h2>All Orders</h2>

      <div className="form-group-horizontal">
        <label>Filter by status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-input">
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userEmail}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>
                <button className="btn-primary" onClick={() => alert("View order details")}>
                  View
                </button>
              </td>
            </tr>
          ))}
          {filteredOrders.length === 0 && (
            <tr>
              <td colSpan="6">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
