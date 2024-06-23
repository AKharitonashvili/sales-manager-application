import mongoose from "mongoose";

export const ProductSchema =
  mongoose.Schema({
    name: {
      type: String,
      required: [
        true,
        "Name is required",
      ],
    },
    price: {
      type: Number,
      required: [
        true,
        "Price is required",
      ],
      default: 0,
    },
    quantity: {
      type: Number,
      required: [
        true,
        "Qquantity is required",
      ],
      default: 0,
    },
    category: {
      type: String,
      required: [
        true,
        "Category is required",
      ],
    },
    category: {
      type: String,
      required: [
        true,
        "Category is required",
      ],
    },
    saleDate: {
      type: String,
    },
    description: {
      type: String,
    },
  });

export const Product = mongoose.model(
  "Product",
  ProductSchema
);
