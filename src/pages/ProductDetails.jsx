import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = ({ user }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://garments-tracker-server-1.onrender.com/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading Product...</div>;
  if (!product) return <div className="text-center mt-20">Product not found!</div>;

  const canOrder = user && user.role !== "admin" && user.role !== "manager" && user.status !== "suspended";

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-sm text-blue-500 uppercase mt-2">{product.category}</p>
          <p className="text-2xl font-bold text-green-600 mt-4">${product.price}</p>
          <hr className="my-4" />
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-4 font-medium">
            Available Quantity: <span className="text-blue-600">{product.availableQuantity}</span>
          </p>
          <p className="mt-2 font-medium">
            Minimum Order Quantity: <span className="text-blue-600">{product.minQuantity || 1}</span>
          </p>

          {user ? (
  canOrder ? (
    <button
      onClick={() => navigate(`/booking/${product._id}`)}
      className="bg-orange-600 text-white px-6 py-3 rounded mt-6 hover:bg-orange-700 transition"
    >
      Order / Book Now
    </button>
  ) : (
    <p className="mt-4 text-red-600">
      You are not eligible to order this product.
    </p>
  )
) : (
  <button
  onClick={() => navigate("/login", { state: { from: `/booking/${product._id}` } })}
  className="bg-orange-600 text-white px-6 py-3 rounded mt-6 hover:bg-orange-700 transition"
>
  Login to Order
</button>

)}

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

