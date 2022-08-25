import * as R from 'ramda';
import { authUser } from '../services/AuthServices';
import {
  createProductService,
  getProductService,
  getAllProductService,
  updateProductService,
  deleteProductService
} from '../services/ProductService';
import { fail, success } from '../utils/respond';

export const allProducts = async (req, res) => {
  const products = await getAllProductService();
  if (!R.isNil(products.status)) {
    return fail(products.status, products.message)(res)();
  }
  return success('Got all products successfully')(res)(products);
};

export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await getProductService(id);
  if (!R.isNil(product.status)) {
    return fail(422, product.message)(res)();
  }
  return success('Fetched one product successfully')(res)(product);
};

export const addProduct = async (req, res) => {
  const user = authUser(req);
  const data = req.body;
  data.sellerId = user.id;
  const newProduct = await createProductService(data);
  if (!R.isNil(newProduct.status)) {
    return fail(newProduct.status, newProduct.message)(res)();
  }
  return success('Added new product successfully')(res)(newProduct);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const user = authUser(req);
  const data = req.body;
  data.id = id;
  data.sellerId = user.id;
  const updated = await updateProductService(data);
  if (!R.isNil(updated.status)) {
    return fail(updated.status, updated.message)(res)();
  }
  return success('Updated product successfully')(res)(updated);
};

export const removeProduct = async (req, res) => {
  const { id } = req.params;
  const user = authUser(req);
  const data = { id, sellerId: user.id };
  const removed = await deleteProductService(data);
  if (!R.isNil(removed.status)) {
    return fail(removed.status, removed.message)(res)();
  }
  return success('Product removed successfully')(res)();
};
