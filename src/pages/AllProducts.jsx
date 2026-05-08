import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AllProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/all-products")
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch(err => {
        console.log(err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: "50px" }}>
        Loading products...
      </div>
    );
  }

  return (
    <div className="page-container">

      <h2 className="text-center" style={{ margin: "30px 0" }}>
        All Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center">
          No products available
        </p>
      ) : (
        <div className="products-grid">

          {products.map(p => (
            <div key={p._id} className="product-card-grid">

              <img src={p.image} alt={p.name} />

              <div className="product-info">

                <h3>{p.name}</h3>

                <p className="category">
                  {p.category}
                </p>

                <p className="price">
                  ${p.price}
                </p>

                <p>
                  Available: {p.availableQuantity}
                </p>

                <button
                  className="btn-order"
                  onClick={() =>
                    navigate(`/product/${p._id}`)
                  }
                >
                  View Details
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default AllProducts;