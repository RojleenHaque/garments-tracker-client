import { useState } from "react";
import Swal from "sweetalert2";
const steps = ["Cutting Completed", "Sewing Started", "Finishing", "QC Checked", "Packed", "Shipped / Out for Delivery"];

const ApprovedOrders = () => {
  const [orders] = useState([{ id: 1, product: "Shirt", approvedDate: "2025-12-23", tracking: [] }]);

  const handleAddTracking = order => {
    Swal.fire({
      title: `Add Tracking for Order #${order.id}`,
      html: `
        <input id="location" class="swal2-input" placeholder="Location">
        <input id="note" class="swal2-input" placeholder="Note">
        <select id="status" class="swal2-select">${steps.map(s => `<option>${s}</option>`).join('')}</select>
      `,
      confirmButtonText: "Add"
    }).then(res => {
      if (res.isConfirmed) Swal.fire("Added!", "Tracking info added.", "success");
    });
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Approved Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th><th>Product</th><th>Approved Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>#{o.id}</td><td>{o.product}</td><td>{o.approvedDate}</td>
              <td><button className="btn-primary" onClick={() => handleAddTracking(o)}>Add Tracking</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedOrders;
