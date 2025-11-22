import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: 0,
    productAvailable: false,
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to load product:", err);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    formData.append("imageFile", imageFile);

    try {
      await axios.put(`${API_URL}/product/${id}`, formData);
      navigate("/admin");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Product</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
        /><br />

        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Brand"
        /><br />

        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
        /><br />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
        ></textarea><br />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        /><br />

        <input
          type="number"
          name="stockQuantity"
          value={product.stockQuantity}
          onChange={handleChange}
          placeholder="Stock Quantity"
        /><br />

        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} /><br />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
