const multer = require("multer");
const router = require("express").Router();
const { requireAdmin } = require("../middleware/auth");
const { uploadBuffer } = require("../config/cloudinary");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 8
  },
  fileFilter(req, file, callback) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.mimetype)) {
      callback(new Error("Only JPG, PNG, WebP, and AVIF images are allowed"));
      return;
    }
    callback(null, true);
  }
});

router.post("/", requireAdmin, upload.array("images", 8), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const uploaded = await Promise.all(
      req.files.map((file) => uploadBuffer(file.buffer))
    );
    const images = uploaded.map((result, index) => ({
      url: result.secure_url,
      name: req.files[index].originalname
    }));

    return res.status(201).json({
      images,
      urls: images.map((image) => image.url)
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
