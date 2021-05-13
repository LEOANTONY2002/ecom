import express from "express";
import Prod from "../models/productModel.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const products = await Prod.find({ email: req.params.email });
    res.send(products);
  } catch (error) {
    res.status(400).send("Server Crashed");
  }
});

router.post("/create", async (req, res) => {
  const p = req.body;
  try {
    const newProduct = await new Prod({
      username: p.username,
      email: p.email,
      name: p.name,
      desc: p.desc,
      image: p.image,
      category: p.category,
      price: p.price,
      stock: p.stock,
      createdAt: new Date().toISOString(),
    });

    const savedProduct = await newProduct.save();
    if (savedProduct) res.send(savedProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Prod.findOne({ _id: productId });
  if (product) {
    product.username = req.body.username;
    product.email = req.body.email;
    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;
    product.image = req.body.image;
    product.stock = req.body.stock;
    product.desc = req.body.desc;
    product.createdAt = new Date().toISOString();

    const updProduct = await product.save();
    if (updProduct) {
      return res
        .status(201)
        .send({ message: "Product Updated", data: updProduct });
    }
  }
  return res.status(500).send({ message: "Error in updating product " });
});

router.delete("/:id", async (req, res) => {
  const deletedProduct = await Prod.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "product Deleted" });
  } else {
    res.send("Error in Deleting Product");
  }
});

export default router;
