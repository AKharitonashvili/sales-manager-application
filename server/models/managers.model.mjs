import mongoose from "mongoose";
import { ProductSchema } from "./product.model.mjs";

const ManagerSchema = mongoose.Schema({
  username: {
    type: String,
    required: [
      true,
      "Username is required",
    ],
  },
  name: {
    type: String,
    required: [
      true,
      "Name is required",
    ],
  },
  surname: {
    type: String,
    required: [
      true,
      "Surname is required",
    ],
  },
  registrationDate: {
    type: String,
    required: [
      true,
      "Registration Date is required",
    ],
  },
  totalSalesRevenue: {
    type: Number,
    default: 0,
  },
  products: [ProductSchema],
});

export const Manager = mongoose.model(
  "Manager",
  ManagerSchema
);
