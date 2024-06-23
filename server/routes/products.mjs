import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.mjs";

export const productRouter =
  express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);

productRouter.post("/", createProduct);

// update a product
productRouter.put(
  "/:id",
  updateProduct
);

// delete a product
productRouter.delete(
  "/:id",
  deleteProduct
);
