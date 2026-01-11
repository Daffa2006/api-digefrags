import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import mongoose from "mongoose";
import { config } from "./config.js";
import {
  notFound,
  errorHandler,
  mongooseValidationError,
} from "./middlewares/error.middleware.js";
import path from "path";
const __dirname = path.resolve();
// import userRoutes from "./routes/user.routes.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/products", productRoutes);
app.use(mongooseValidationError);
app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(config.mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
