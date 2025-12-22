import React from 'react';
import { useNavigate } from 'react-router-dom';

const AllProducts = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>All Products</h2>
      {/* Requirement: 3-column grid layout  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products?.map(product => (
          <div key={product._id} className="product-card border p-4 rounded shadow">
            <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
            <div className="card-body">
              <h4>{product.name}</h4>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Available: {product.availableQuantity}</p>
              <button 
                onClick={() => navigate(`/product/${product._id}`)} 
                className="btn-primary mt-4"
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

// CRITICAL FIX: Add this line
export default AllProducts;