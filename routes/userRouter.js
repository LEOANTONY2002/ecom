import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const exist = await User.findOne({ email: req.body.email });
  if (exist) return res.status(400).send("Email Already Exists");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET_TOKEN);
    // res.header("auth-token", token).send(token);
    res.send({
      name: savedUser.name,
      email: savedUser.email,
    });
  } catch (err) {
    res.status(400).send("Can't register, Check the fields");
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does not exists");

  const pwVerify = await bcrypt.compare(req.body.password, user.password);
  if (!pwVerify) return res.status(401).send("Invalid Login Credentials");

  // const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  // res.header("auth-token", token).send(token);
  res.send({
    name: user.name,
    email: user.email,
  });
});

export default router;
