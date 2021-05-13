import express from "express";
import Prod from "../models/productModel.js";

const router = express.Router();

router.get('/:category', async (req, res) => {
    
    try {
        const cat = req.params.category
        const products = await Prod.find({ category: cat });
        res.send(products);
      } catch (error) {
        res.status(400).send(error.message);
      }
})

export default router;