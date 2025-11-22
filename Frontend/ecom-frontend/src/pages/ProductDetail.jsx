import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";


const API_URL = "http://localhost:8080/api";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);


  useEffect(() => {
    fetchProduct();
    fetchRecommendations();
  }, [id]); // important: reload when the id changes

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/${id}/recommendations`);
      setRecommended(res.data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        ← Back to Home
      </button>

      <button
  onClick={() =>{addToCart(product)
    alert("Product added to cart");
  }}
  
  style={{
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Add to Cart
</button>

      {/* Main Product Details */}
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {product.imageData && (
          <img
            src={`${API_URL}/product/${product.id}/image`}
            alt={product.name}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />
        )}

        <div style={{ flex: 1 }}>
          <h1>{product.name}</h1>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Available:</strong> {product.productAvailable ? "In Stock" : "Out of Stock"}</p>
          <p><strong>Stock Quantity:</strong> {product.stockQuantity}</p>

          <p style={{ marginTop: "20px" }}>
            <strong>Description:</strong> {product.description}
          </p>
        </div>
      </div>

      {/* ⭐ STEP 5 — Recommended Products Section */}
      <h2 style={{ marginTop: "40px" }}>Recommended Products</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {recommended.length === 0 && <p>No recommended products found.</p>}

        {recommended.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              width: "200px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            <img
              src={`${API_URL}/product/${item.id}/image`}
              alt={item.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
  

}

export default ProductDetail;
