import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderControllers.js";
const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
