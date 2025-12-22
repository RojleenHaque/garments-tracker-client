import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <section className="hero">
        <div className="hero-content">
          <h1>Efficient Garment Production Tracking</h1>
          <p>Streamline your workflow and monitor garment production in real-time.</p>
          <button className="cta-btn" onClick={() => navigate('/products')}>
            View Products
          </button>
        </div>
      </section>
      
      <section className="our-products">
        <h2>Our Featured Products</h2>
        <div className="product-grid">
          {/* Map top 6 products here */}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
