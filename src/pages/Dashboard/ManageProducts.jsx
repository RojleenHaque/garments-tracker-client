import { useState } from "react";
import Swal from "sweetalert2";


const sampleProducts = [
  { id: 1, name: "Shirt", price: 25, paymentMode: "COD", image: "" },
  { id: 2, name: "Pant", price: 30, paymentMode: "Online", image: "" }
];

const ManageProducts = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [search, setSearch] = useState("");

  const handleDelete = (product) => {
    Swal.fire({
      title: `Delete ${product.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(result => {
      if (result.isConfirmed) setProducts(products.filter(p => p.id !== product.id));
    });
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="table-container">
      <h2 className="table-title">Manage Products</h2>
      <input 
        type="text" 
        placeholder="Search products..." 
        className="form-input search-bar" 
        onChange={e => setSearch(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Price</th><th>Payment Mode</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td><img src={p.image || "/placeholder.png"} alt="" className="img-table" /></td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.paymentMode}</td>
              <td>
                <button className="btn-edit">Update</button>
                <button className="btn-delete" onClick={() => handleDelete(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
