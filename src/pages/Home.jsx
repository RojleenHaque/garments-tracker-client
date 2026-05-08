import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/home-products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Efficient Garment Production Tracking</h1>
          <p>Manage orders, production & delivery in one system</p>

          <button
            className="cta-btn"
            onClick={() => navigate("/products")}
          >
            View All Products
          </button>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured-section">
        <h2 className="section-title">Featured Products</h2>

        <div className="featured-grid">
          {products.map(product => (
            <div key={product._id} className="featured-card">

              <img src={product.image} alt={product.name} />

              <div className="featured-info">
                <h3>{product.name}</h3>

                <p className="category">{product.category}</p>

                <p className="price">${product.price}</p>

                <button
                  className="btn-primary"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;