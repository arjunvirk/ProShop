import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import {
  errorMessageMiddleware,
  notFoundMiddleware,
} from "./middlewares/errorMiddlewares.js";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.use("/api/products",productRoutes);

app.use(notFoundMiddleware);
app.use(errorMessageMiddleware);

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
