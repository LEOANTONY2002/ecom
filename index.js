import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import userProductRouter from "./routes/userProductRouter.js";
import shippingRouter from "./routes/shippingRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import orderRouter from "./routes/orderRouter.js";
import path from "path";

const __dirname = path.resolve();
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/product/category", categoryRouter);
app.use("/user/product", userProductRouter);
app.use("/user", shippingRouter);
app.use("/upload", uploadRouter);
app.use("/order", orderRouter);

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(express.static(path.join(__dirname, "ecom", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "ecom", "build", "index.html"));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "ecom", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "ecom", "build", "index.html"));
  });
}

var port = process.env.PORT || 80;
var host = process.env.HOST || "0.0.0.0";
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(port, host, () => console.log("Success....")))
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);

//git@github.com:LEOANTONY2002/ecom.git
//https://github.com/LEOANTONY2002/ecom.git
