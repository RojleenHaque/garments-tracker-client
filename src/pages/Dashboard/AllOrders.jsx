import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";

const AllOrders = () => {

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");

  // load all orders
  useEffect(() => {

    api.get("/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  // filter by status
  const filteredOrders = filter
    ? orders.filter(
        (order) => order.status === filter
      )
    : orders;

  // view order details
  const handleView = (order) => {

    Swal.fire({
      title: "Order Details",
      html: `
        <div style="text-align:left">
          <p><b>Order ID:</b> ${order._id}</p>
          <p><b>User:</b> ${order.userEmail}</p>
          <p><b>Product:</b> ${order.productName}</p>
          <p><b>Quantity:</b> ${order.quantity}</p>
          <p><b>Total Price:</b> $${order.totalPrice}</p>
          <p><b>Status:</b> ${order.status}</p>
          <p><b>Payment:</b> ${order.paymentMethod}</p>
          <p><b>Contact:</b> ${order.contactNumber}</p>
          <p><b>Address:</b> ${order.deliveryAddress}</p>
        </div>
      `,
      confirmButtonText: "Close",
    });

  };

  return (
    <div className="table-container">

      <h2 className="table-title">
        All Orders
      </h2>

      {/* FILTER */}
      <div className="form-group-horizontal mb-4">

        <label>
          Filter By Status:
        </label>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-input"
        >
          <option value="">
            All Orders
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Approved">
            Approved
          </option>

          <option value="Rejected">
            Rejected
          </option>
        </select>

      </div>

      {/* TABLE */}
      <table className="table">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredOrders.length > 0 ? (

            filteredOrders.map((order) => (

              <tr key={order._id}>

                <td>
                  {order._id.slice(0, 8)}...
                </td>

                <td>
                  {order.userEmail}
                </td>

                <td>
                  {order.productName}
                </td>

                <td>
                  {order.quantity}
                </td>

                <td>

                  <span
                    className={
                      order.status === "Approved"
                        ? "status-approved"
                        : order.status === "Rejected"
                        ? "status-rejected"
                        : "status-pending"
                    }
                  >
                    {order.status}
                  </span>

                </td>

                <td>
                  {order.paymentMethod}
                </td>

                <td>

                  <button
                    className="btn-primary"
                    onClick={() => handleView(order)}
                  >
                    View
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="7">
                No orders found
              </td>
            </tr>

          )}

        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;