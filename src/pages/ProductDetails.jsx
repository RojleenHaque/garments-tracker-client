import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api
      .get(`/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleOrderClick = () => {

    // not logged in
    if (!user) {
      navigate("/login", {
        state: {
          from: `/booking/${product._id}`,
        },
      });

      return;
    }

    // admin restriction
    if (user.role !== "buyer") {
      Swal.fire(
        "Access Denied",
        "Only buyers can place orders",
        "error"
      );

      return;
    }

    // go booking
    navigate(`/booking/${product._id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-container">

      <div className="product-card">

        <img
          src={product.image}
          alt={product.name}
        />

        <div className="product-info">

          <h2>{product.name}</h2>

          <p className="category">
            {product.category}
          </p>

          <p className="price">
            ${product.price}
          </p>

          <p>{product.description}</p>

          <p>
            Available Quantity:
            <b> {product.availableQuantity}</b>
          </p>

          <p>
            Minimum Order:
            <b> {product.minQuantity}</b>
          </p>

          <button
            className="btn-order"
            onClick={handleOrderClick}
          >
            Order / Book Now
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;