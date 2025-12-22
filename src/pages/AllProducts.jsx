import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching all products from the backend
    axios.get('http://localhost:5000/all-products?size=20') // Set size higher than 12
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading inventory...</div>;

  return (
    <div className="page-container">
      <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>Factory Inventory</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="card-body">
              <h4>{product.name}</h4>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Available: {product.availableQuantity}</p>
              <button 
                onClick={() => navigate(`/product/${product._id}`)} 
                className="btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
