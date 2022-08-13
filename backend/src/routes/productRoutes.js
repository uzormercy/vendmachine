import express from 'express';
import { allProducts } from '../controllers/Products';
import { authorized, isSeller } from '../middleware/authenticate';

const router = express.Router();

router.get('/products', isSeller, allProducts);
export default router;
