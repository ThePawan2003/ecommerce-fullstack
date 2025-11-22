import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";


function App() {
  return (
    <Router>
      <Routes>

        {/* User Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddProduct />} />
        <Route path="/admin/edit/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
    </Router>
  );
}

export default App;
