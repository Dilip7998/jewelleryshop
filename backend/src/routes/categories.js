const router = require("express").Router();
const Category = require("../models/Category");
const { requireAdmin } = require("../middleware/auth");

const defaults = [
  "Gold Jewellery",
  "Diamond Jewellery",
  "Silver Jewellery",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bangles"
];

router.get("/", async (req, res, next) => {
  try {
    const records = await Category.find().sort({ name: 1 });
    if (records.length === 0) return res.json(defaults);
    return res.json(records.map((record) => record.name));
  } catch (error) {
    return next(error);
  }
});

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    if (!name) return res.status(400).json({ message: "Category name is required" });

    const category = await Category.findOneAndUpdate(
      { name },
      { name },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json({ name: category.name });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:name", requireAdmin, async (req, res, next) => {
  try {
    const name = decodeURIComponent(req.params.name);
    await Category.deleteOne({ name });
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
