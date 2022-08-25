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

export const getAllProductService = () => find(Product);

export const createProductService = async (data) => {
  const validate = await validator(productValidator)(data);
  if (!R.isNil(validate.type)) {
    return validate;
  }
  const { name, price, sellerId, quantity } = validate;

  const product = Product.of({
    _id: uuid(),
    sellerId,
    price,
    name,
    quantity
  });
  const save = await store(product);
  return save;
};

export const getProductService = (_id) => findOne(Product)({ _id });

export const updateProductService = async (data) => {
  const validate = await validator(productValidator)(data);
  if (!R.isNil(validate.type)) {
    return validate;
  }
  const { name, price, sellerId, quantity } = validate;
  const product = await findOne(Product)({ _id: data.id, sellerId });
  if (!product) {
    return {
      status: 404,
      message: 'Product not found or has been moved'
    };
  }
  await findAndUpdate(Product)(data.id)({
    name,
    price,
    quantity
  });

  return await findOne(Product)({ _id: data.id, sellerId });
};

export const deleteProductService = async (data) => {
  const { id, sellerId } = data;
  const product = await findOne(Product)({ _id: id, sellerId });
  if (!product) {
    return {
      status: 404,
      message: 'Product not found or has been moved'
    };
  }
  const remove = await findAndDelete(Product)(id);
  return remove;
};
