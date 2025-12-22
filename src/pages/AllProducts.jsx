useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://garments-tracker-server-1.onrender.com/all-products'
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all products:', error);
      setLoading(false);
    }
  };
  fetchProducts();
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
