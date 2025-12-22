const PendingOrders = () => {
  return (
    <div className="table-container">
      <h2>Pending Approvals</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#ORD-9921</td>
            <td>Premium Cotton Shirt</td>
            <td>500</td>
            <td>
              <button className="btn-approve">Approve</button> {/* [cite: 211] */}
              <button className="btn-reject">Reject</button> {/* [cite: 212] */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;