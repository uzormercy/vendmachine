import { getProducts } from '../services/ProductService';

export const allProducts = async (req, res) => {
  const products = getProducts();
  return;
};
