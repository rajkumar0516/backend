import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdAt: Date;
  images: string[];
}
const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  images: { type: [String] },
});

export const Product: Model<IProduct> = mongoose.model<IProduct>(
  'Product',
  ProductSchema
);
