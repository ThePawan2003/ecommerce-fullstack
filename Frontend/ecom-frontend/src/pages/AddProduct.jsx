import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/product";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    category: "",
    price: "",
    stockQuantity: 0,
    productAvailable: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    formData.append("imageFile", imageFile);

    await axios.post(API_URL, formData);
    navigate("/admin");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} /><br />
        <input type="text" name="brand" placeholder="Brand" onChange={handleChange} /><br />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea><br />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} /><br />
        <input type="number" name="stockQuantity" placeholder="Stock Quantity" onChange={handleChange} /><br />

        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
