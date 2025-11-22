import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    await axios.delete(`${API_URL}/product/${id}`);
    loadProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <button
        onClick={() => navigate("/admin/add")}
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "green",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        + Add New Product
      </button>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Category</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.brand}</td>
              <td>₹{p.price}</td>
              <td>{p.category}</td>
              <td>{p.productAvailable ? "Yes" : "No"}</td>

              <td>
                <button
                  onClick={() => navigate(`/admin/edit/${p.id}`)}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{ cursor: "pointer", backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
