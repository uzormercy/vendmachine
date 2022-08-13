import mongoose from '../config/database';

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    _id: { type: String },
    sellerId: { type: String, required: 'Seller cannot be null' },
    quantity: { type: Number, required: 'Product quantity is required' },
    price: { type: Number, required: 'Product price cannot be null' },
    name: { type: String, required: 'Product name cannot be null' }
  },
  {
    toJSON: {
      transform: (doc, obj) => {
        delete obj.__v;
      }
    }
  }
);

ProductSchema.statics.of = (data) => new Product(data);

const Product = mongoose.model('product', ProductSchema);

export default Product;
