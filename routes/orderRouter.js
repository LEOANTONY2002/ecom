import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const orders = await Order.find({ email: email });
    res.send(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/create", async (req, res) => {
  const p = req.body;
  try {
    const newOrder = await new Order({
      username: p.username,
      email: p.email,
      products: p.products,
      payment: p.payment,
      createdAt: new Date().toISOString(),
    });

    const savedOrder = await newOrder.save();
    if (savedOrder) res.send(savedOrder);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
