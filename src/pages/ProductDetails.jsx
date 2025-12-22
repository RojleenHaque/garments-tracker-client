import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Ensure the URL matches your server port (5000)
        axios.get(`http://localhost:5000/product/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-20">Loading Product Details...</div>;
    if (!product) return <div className="text-center mt-20">Product not found!</div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex flex-col md:flex-row gap-8">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full md:w-1/2 rounded-lg shadow-lg object-cover h-96" 
                />
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                    <p className="text-sm text-blue-500 font-semibold uppercase mt-2">
                        {product.category}
                    </p>
                    <p className="text-2xl font-bold text-green-600 mt-4">${product.price}</p>
                    <hr className="my-4" />
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    <p className="mt-4 font-medium">
                        Available Quantity: <span className="text-blue-600">{product.availableQuantity}</span>
                    </p>
                    
                    {/* Assignment Requirement: Order/Booking button */}
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md mt-6 hover:bg-blue-700 transition-colors w-full">
                        Book This Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
