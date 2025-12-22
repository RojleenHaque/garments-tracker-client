// src/pages/ProductDetails.jsx
const ProductDetails = () => {
  // Check if User is Manager or Admin - if so, disable Order button [cite: 106]
  const isEligibleToOrder = userRole !== 'admin' && userRole !== 'manager';

  return (
    <div className="details-container">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      
      {isEligibleToOrder && (
        <button onClick={handleBooking}>Order / Booking</button>
      )}
    </div>
  );
};