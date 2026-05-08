import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (!user?.email) return;

    api.get(`/my-orders?email=${user.email}`)
      .then(res => {
        setOrders(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error(err);
        setOrders([]);
      });

  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h2 className="text-2xl font-bold mb-6">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p>No bookings found.</p>
      ) : (

        <table className="w-full border">

          <thead>
            <tr className="bg-orange-200">
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Booked At</th>
            </tr>
          </thead>

          <tbody>

            {orders.map(order => (

              <tr key={order._id} className="text-center border-t">

                <td>{order.productName}</td>

                <td>{order.quantity}</td>

                <td>
                  ${order.totalPrice || 0}
                </td>

                <td>{order.paymentMethod}</td>

                <td>
                  <span
                    className={
                      order.status === "Approved"
                        ? "text-green-600"
                        : order.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "N/A"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
};

export default MyOrders;