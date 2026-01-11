import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: { required: true, type: String, trim: true },
    price: { required: true, type: Number, min: 0 },
    image: { required: true, type: String },
    description: { required: true, type: String },
    stock: { required: true, type: Number, min: 0 },
    featured: { default: false, type: Boolean },
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);
