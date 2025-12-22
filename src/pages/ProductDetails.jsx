import React from 'react';
import './Products.css';

const ProductDetails = ({ product, userRole, handleBooking }) => {
  const isEligibleToOrder = userRole !== 'admin' && userRole !== 'manager';

  if (!product) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <img className="details-image" src={product.image} alt={product.name} />
      <div className="details-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Available:</strong> {product.availableQuantity}</p>
        {isEligibleToOrder && (
          <button onClick={handleBooking} className="btn-primary">Order / Booking</button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
