import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../api/axios";

const PendingOrders = () => {

  const [orders, setOrders] = useState([]);

  // load pending orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const res = await api.get("/orders");

      const pendingOrders = res.data.filter(
        (order) => order.status === "Pending"
      );

      setOrders(pendingOrders);

    } catch (err) {
      console.log(err);
    }
  };

  // approve
  const handleApprove = async (order) => {

    try {

      await api.patch(`/orders/${order._id}`, {
        status: "Approved",
      });

      Swal.fire(
        "Approved",
        "Order approved successfully",
        "success"
      );

      fetchOrders();

    } catch (err) {

      Swal.fire(
        "Error",
        "Failed to approve order",
        "error"
      );
    }
  };

  // reject
  const handleReject = async (order) => {

    try {

      await api.patch(`/orders/${order._id}`, {
        status: "Rejected",
      });

      Swal.fire(
        "Rejected",
        "Order rejected",
        "success"
      );

      fetchOrders();

    } catch (err) {

      Swal.fire(
        "Error",
        "Failed to reject order",
        "error"
      );
    }
  };

  // view
  const handleView = (order) => {

    Swal.fire({
      title: order.productName,

      html: `
        <p><b>User:</b> ${order.userEmail}</p>
        <p><b>Quantity:</b> ${order.quantity}</p>
        <p><b>Total:</b> $${order.totalPrice}</p>
        <p><b>Payment:</b> ${order.paymentMethod}</p>
        <p><b>Address:</b> ${order.deliveryAddress}</p>
        <p><b>Status:</b> ${order.status}</p>
      `,

      confirmButtonText: "Close",
    });
  };

  return (
    <div className="table-container">

      <h2 className="table-title">
        Pending Orders
      </h2>

      <table className="table">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {orders.length > 0 ? (

            orders.map((o) => (

              <tr key={o._id}>

                <td>
                  #{o._id.slice(-5)}
                </td>

                <td>
                  {o.userEmail}
                </td>

                <td>
                  {o.productName}
                </td>

                <td>
                  {o.quantity}
                </td>

                <td>
                  {new Date(
                    o.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <button
                    className="btn-approve"
                    onClick={() =>
                      handleApprove(o)
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="btn-reject"
                    onClick={() =>
                      handleReject(o)
                    }
                  >
                    Reject
                  </button>

                  <button
                    className="btn-edit"
                    onClick={() =>
                      handleView(o)
                    }
                  >
                    View
                  </button>

                </td>
              </tr>
            ))

          ) : (
            <tr>
              <td colSpan="6">
                No Pending Orders
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;