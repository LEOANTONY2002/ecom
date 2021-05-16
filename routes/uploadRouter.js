import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  const service = req.body.main_name;
  const url = req.protocol + "://" + req.get("host");

  res.send(`${url}/uploads/${req.file.filename}`);
});

export default router;
