import express from "express";
import Prod from "../models/productModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Prod.find({});
    res.send(products);
  } catch (error) {
    res.status(400).send("Server Crashed");
  }
});

router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Prod.findOne({ _id: id });
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
