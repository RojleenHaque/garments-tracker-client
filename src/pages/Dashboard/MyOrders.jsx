import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios.get('http://localhost:5000/my-orders', { withCredentials: true })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? <p>No bookings found.</p> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-orange-200">
              <th>Product</th>
              <th>Quantity</th>
              <th>Order Price</th>
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
                <td>${order.orderPrice}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
