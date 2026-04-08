import express from "express";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productControllers.js";
import protect, { admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", getAllProducts);
router.post("/:id/reviews", protect, createProductReview);
router.get("/top", getTopProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, createProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id", protect, admin, updateProduct);

export default router;
