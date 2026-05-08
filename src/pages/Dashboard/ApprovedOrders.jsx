import { useEffect, useState } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";

const ApprovedOrders = () => {

  const [orders, setOrders] = useState([]);

  // load only approved orders
  useEffect(() => {

    api.get("/orders")
      .then((res) => {

        const approvedOrders = res.data.filter(
          order => order.status === "Approved"
        );

        setOrders(approvedOrders);

      })
      .catch((err) => console.log(err));

  }, []);

  // tracking placeholder
  const handleTracking = (order) => {

    Swal.fire({
      title: "Add Tracking",
      text: `Tracking added for ${order.productName}`,
      icon: "success",
    });

  };

  return (
    <div className="table-container">

      <h2 className="table-title">
        Approved Orders
      </h2>

      <table className="table">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Approved Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {orders.length > 0 ? (
            orders.map(order => (

              <tr key={order._id}>

                <td>{order._id.slice(0, 6)}</td>

                <td>{order.userEmail}</td>

                <td>{order.productName}</td>

                <td>{order.quantity}</td>

                <td>
                  {order.approvedAt
                    ? new Date(order.approvedAt)
                        .toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  <span className="status-approved">
                    Approved
                  </span>
                </td>

                <td>

                  <button
                    className="btn-primary"
                    onClick={() => handleTracking(order)}
                  >
                    Add Tracking
                  </button>

                </td>

              </tr>

            ))
          ) : (
            <tr>
              <td colSpan="7">
                No approved orders found
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};

export default ApprovedOrders;