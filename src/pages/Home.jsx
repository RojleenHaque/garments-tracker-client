import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch featured products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://garments-tracker-server-1.onrender.com/home-products'
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Efficient Garment Production Tracking</h1>
          <p>Streamline your workflow and monitor garment production in real-time.</p>
          <button className="cta-btn" onClick={() => navigate('/products')}>
            View Products
          </button>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="our-products">
        <h2>Our Featured Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.description?.slice(0, 60)}...</p>
              <p className="price">${product.price}</p>
              <button 
                className="btn-primary" 
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
