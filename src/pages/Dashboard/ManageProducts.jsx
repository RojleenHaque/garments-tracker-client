import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // load products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/all-products");

      // manager products only
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const managerProducts = res.data.filter(
        (p) => p.createdBy === user?.email
      );

      setProducts(managerProducts);

    } catch (err) {
      console.log(err);
    }
  };

  // delete product
  const handleDelete = async (product) => {
    Swal.fire({
      title: `Delete ${product.name}?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#e74c3c",
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {

          await api.delete(
            `/products/${product._id}`
          );

          Swal.fire(
            "Deleted!",
            "Product deleted successfully",
            "success"
          );

          fetchProducts();

        } catch (err) {
          console.log(err);

          Swal.fire(
            "Error",
            "Failed to delete product",
            "error"
          );
        }
      }
    });
  };

  // search by name or category
  const filteredProducts = products.filter(
    (p) =>
      p.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      p.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="table-container">

      <h2 className="table-title">
        Manage Products
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name or category..."
        className="form-input search-bar"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* TABLE */}
      <table className="table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Payment Mode</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredProducts.length > 0 ? (

            filteredProducts.map((p) => (
              <tr key={p._id}>

                <td>
                  <img
                    src={
                      p.image ||
                      "https://via.placeholder.com/80"
                    }
                    alt={p.name}
                    className="img-table"
                  />
                </td>

                <td>{p.name}</td>

                <td>${p.price}</td>

                <td>
                  {p.paymentMethod || "COD"}
                </td>

                <td>

                  {/* UPDATE */}
                  <button
                    className="btn-edit"
                    onClick={() =>
                      navigate(
                        `/dashboard/update-product/${p._id}`
                      )
                    }
                  >
                    Update
                  </button>

                  {/* DELETE */}
                  <button
                    className="btn-delete"
                    onClick={() =>
                      handleDelete(p)
                    }
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))

          ) : (
            <tr>
              <td colSpan="5">
                No products found
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;