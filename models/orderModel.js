import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  products: [],
  payment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
    required: true,
  },
});

const order = mongoose.model("Order", orderSchema);
export default order;
