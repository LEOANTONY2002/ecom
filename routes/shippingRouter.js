import express from "express";
import Shipping from "../models/shippingModel.js";

const router = express.Router();

router.post("/shipping", async (req, res) => {
  const p = req.body;
  const oldShipping = await Shipping.findOne({ email: p.email });
  const newShipping = await new Shipping({
    name: p.name,
    email: p.email,
    address: p.address,
    city: p.city,
    state: p.state,
    country: p.country,
    zip: p.zip,
    phone: p.phone,
    createdAt: new Date().toISOString(),
  });

  if (oldShipping) {
    const upd = await Shipping.findOneAndUpdate(
      { email: p.email },
      {
        name: p.name,
        email: p.email,
        address: p.address,
        city: p.city,
        state: p.state,
        country: p.country,
        zip: p.zip,
        phone: p.phone,
        createdAt: new Date().toISOString(),
      }
    );
    if (upd) {
      res.send(upd);
      console.log(upd);
    }
  } else {
    try {
      const savedShipping = await newShipping.save();
      if (savedShipping) res.send(savedShipping);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
});

router.get("/shipping/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const shipping = await Shipping.findOne({ email: email });
    res.send(shipping);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
