import Product from "../models/Product.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    return res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  } catch (error) {
    next(error);
  }
};
