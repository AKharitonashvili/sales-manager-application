import { Manager } from "../models/managers.model.mjs";
import { Product } from "../models/product.model.mjs";

export const getProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find(
      {}
    ).lean();
    const transformedProducts =
      products.map(
        ({ _id, __v, ...rest }) => ({
          id: _id.toString(),
          ...rest,
        })
      );
    res
      .status(200)
      .json(transformedProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

export const getProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const product =
      await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

export const createProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.create(req.body);

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

export const updateProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const product =
      await Product.findByIdAndUpdate(
        id,
        req.body
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const updatedProduct =
      await Product.findById(id);
    res
      .status(200)
      .json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

export const deleteProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const product =
      await Product.findByIdAndDelete(
        id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

export const sellProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { quantity, managerId } =
      req.body;
    let product =
      await Product.findById(id);

    let manager =
      await Manager.findById(managerId);

    if (
      !product ||
      product.quantity < quantity
    ) {
      return res.status(404).json({
        message:
          "Product not found in stock",
      });
    }

    const newProduct = {
      ...product.toObject(),
      quantity:
        product.quantity - quantity,
    };

    product =
      await Product.findByIdAndUpdate(
        id,
        newProduct,
        { new: true }
      );

    const products = manager.products;
    for (let i = 0; i < quantity; i++) {
      products.push({
        ...product.toObject(),
        saleDate: new Date(),
      });
    }
    const totalSalesRevenue =
      products.reduce(
        (acc, curr) => acc + curr.price,
        0
      );
    const newManager = {
      ...manager.toObject(),
      products,
      totalSalesRevenue,
    };

    manager =
      await Manager.findByIdAndUpdate(
        managerId,
        newManager,
        { new: true }
      );

    res.status(200).json({
      product,
      manager,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};
