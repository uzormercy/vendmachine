import { v4 as uuid } from 'uuid';
import * as R from 'ramda';
import Product from '../models/Product';
import {
  find,
  findOne,
  store,
  findAndUpdate,
  findAndDelete
} from '../utils/execute';
import { productValidator } from '../validators/productValidators';
import validator from '../validators/validator';

export const getProducts = () => find(Product);

export const createProduct = async (data) => {
  const validate = validator(productValidator)(data);
  if (!R.isNil(validate.type)) {
    return validate;
  }
  const { name, price, seller, quantity } = validate;

  const product = Product.of({
    _id: uuid(),
    sellerId: seller,
    price,
    name,
    quantity
  });
  const save = await store(product);
  return { data: save };
};

export const getProduct = (_id) => findOne(Product)({ _id });

export const updateProduct = async (data) => {
  const validate = validator(productValidator)(data);
  if (!R.isNil(validate.type)) {
    return validate;
  }
  const { name, price, seller, quantity } = validate;

  const product = await findOne(Product)({ _id: data.id, sellerId: seller });
  if (!product) {
    return {
      status: 404,
      message: 'Product not found or has been moved'
    };
  }
  return findAndUpdate(Product)(data.id)({
    name,
    price,
    quantity
  });
};

export const deletProduct = async (data) => {
  const { id, seller } = data;
  const product = await findOne(Product)({ _id: id, sellerId: seller });
  if (!product) {
    return {
      status: 404,
      message: 'Product not found or has been moved'
    };
  }
  return findAndDelete(Product)(id);
};
