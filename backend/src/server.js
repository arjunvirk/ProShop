import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
