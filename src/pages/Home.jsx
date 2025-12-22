import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



const sampleProducts = [
  { id: 1, name: "T-Shirt", image: "images/tshirt.jfif" },
  { id: 2, name: "Jeans", image: "/images/product2.jpg" },
  { id: 3, name: "Jacket", image: "/images/product3.jpg" },
  { id: 4, name: "Dress", image: "/images/product4.jpg" },
  { id: 5, name: "Shoes", image: "/images/product5.jpg" },
  { id: 6, name: "Hat", image: "/images/product6.jpg" },
];

const Home = () => {
  const navigate = useNavigate();

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
        <h2>Our Featured Products Categories</h2>
        <div className="product-grid">
          {sampleProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
