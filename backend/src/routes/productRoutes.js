import express from 'express';
import {
  addProduct,
  allProducts,
  getOneProduct,
  removeProduct,
  updateProduct
} from '../controllers/Products';
import { authorized, isSeller } from '../middleware/authenticate';

const router = express.Router();

router.get('/products', isSeller, allProducts);
router.post('/products/add', isSeller, addProduct);
router.get('/product/:id', isSeller, getOneProduct);
router.patch('/product/update/:id', isSeller, updateProduct);
router.delete('/product/:id/remove', isSeller, removeProduct);
export default router;
