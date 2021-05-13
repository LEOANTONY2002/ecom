import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

// cloudinary.v2.config({
//   cloud_name: "leoantony2002",
//   api_key: 485371222372597,
//   api_secret: "WqpzjTKivA-csYHriay0qNNpX4g",
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "ecom",
//     format: async () => "jpg",
//     public_id: (req, file) => file.filename,
//   },
// });

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  const service = req.body.main_name;
  const url = req.protocol + "://" + req.get("host");

  res.send(`${url}/uploads/${req.file.filename}`);
});

export default router;
