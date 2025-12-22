// src/pages/Home.jsx
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="hero">
        <h1>Efficient Garment Production Tracking</h1>
        <button className="cta-btn">View Products</button> {/* [cite: 50] */}
      </section>
      
      <section className="our-products">
        <h2>Our Products</h2>
        <div className="product-grid">
          {/* Map products here (Limit 6) [cite: 51] */}
        </div>
      </section>
    </motion.div>
  );
};