import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getAllProducts = async () => {
  return await axios.get(`${BASE_URL}/products`);
};

export const getProductById = async (id) => {
  return await axios.get(`${BASE_URL}/product/${id}`);
};

export const addProduct = async (product) => {
  return await axios.post(`${BASE_URL}/product`, product);
};

export const getRecommendedProducts = async (id) => {
  return await axios.get(`${BASE_URL}/product/${id}/recommendations`);
};

export const searchProducts = async (keyword) => {
  return await axios.get(`${BASE_URL}/products/search?keyword=${keyword}`);
};
