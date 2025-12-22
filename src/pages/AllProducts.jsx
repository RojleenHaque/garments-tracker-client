import React from 'react';
import { useNavigate } from 'react-router-dom';


const AllProducts = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h2>All Products</h2>
      <div className="grid">
        {products?.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="card-body">
              <h4>{product.name}</h4>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Available: {product.availableQuantity}</p>
              <button onClick={() => navigate(`/product/${product._id}`)} className="btn-primary">
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
