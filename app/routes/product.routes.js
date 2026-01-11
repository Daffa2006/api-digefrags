import { Router } from "express";
import upload from "../multer.js";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { sanitizeBody } from "../middlewares/sanitizeBody.middleware.js";
const router = Router();
router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", upload.single("image"), sanitizeBody, createProduct);
router.put("/:id", upload.single("image"), sanitizeBody, updateProduct);
router.delete("/:id", deleteProduct);
export default router;
