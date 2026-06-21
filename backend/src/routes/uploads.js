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
    if (!file.mimetype.startsWith("image/")) {
      callback(new Error("Only image files are allowed"));
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
    return res.status(201).json({
      urls: uploaded.map((result) => result.secure_url)
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
