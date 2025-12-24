import Swal from "sweetalert2";

const sampleOrders = [
  { id: 1, user: "Rojleen Haque", product: "Shirt", quantity: 10, date: "2025-12-23" }
];

const PendingOrders = () => {
  const handleApprove = order => Swal.fire("Approved", `Order ${order.id} approved!`, "success");
  const handleReject = order => Swal.fire("Rejected", `Order ${order.id} rejected!`, "error");

  return (
    <div className="table-container">
      <h2 className="table-title">Pending Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th><th>User</th><th>Product</th><th>Quantity</th><th>Order Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sampleOrders.map(o => (
            <tr key={o.id}>
              <td>#{o.id}</td><td>{o.user}</td><td>{o.product}</td><td>{o.quantity}</td><td>{o.date}</td>
              <td>
                <button className="btn-approve" onClick={() => handleApprove(o)}>Approve</button>
                <button className="btn-reject" onClick={() => handleReject(o)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;
