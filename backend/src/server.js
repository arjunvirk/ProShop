import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import {
  errorMessageMiddleware,
  notFoundMiddleware,
} from "./middlewares/errorMiddlewares.js";

const app = express();

dotenv.config();

connectDB();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFoundMiddleware);
app.use(errorMessageMiddleware);

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
