import { useEffect, useState } from "react";
import { getAllProducts, searchProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    // If search box is empty → load all products
    if (value.trim() === "") {
      loadProducts();
      return;
    }

    try {
      const response = await searchProducts(value);
      setProducts(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>E-Commerce Products</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Product Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleClick(product.id)}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "10px",
                width: "220px",
                cursor: "pointer",
                backgroundColor: "#fff",
              }}
            >
              {/* ⭐ Product Image */}
              <img
                src={`${API_URL}/product/${product.id}/image`}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />

              <h3 style={{ margin: "5px 0" }}>{product.name}</h3>
              <p style={{ margin: "5px 0", color: "#555" }}>{product.brand}</p>
              <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                ₹{product.price}
              </p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
        <button
  onClick={() => navigate("/cart")}
  style={{
    position: "absolute",
    right: "20px",
    top: "20px",
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    borderRadius: "5px"
  }}
>
  🛒 Cart
</button>

      </div>
    </div>
   
  );
  

}

export default Home;
