const mongoose = require("mongoose");
const router = require("express").Router();
const Product = require("../models/Product");
const { requireAdmin } = require("../middleware/auth");

function normalizeProduct(body) {
  return {
    name: body.name,
    category: body.category,
    originalPrice: Number(body.originalPrice),
    discountPercent: Number(body.discountPercent || 0),
    images: Array.isArray(body.images) ? body.images : [],
    description: body.description,
    material: body.material || "",
    sku: body.sku || "",
    inStock: Boolean(body.inStock),
    featured: Boolean(body.featured),
    newArrival: Boolean(body.newArrival)
  };
}

router.get("/", async (req, res, next) => {
  try {
    const { category, q, maxPrice, inStock } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (inStock === "true") filter.inStock = true;
    if (maxPrice) filter.originalPrice = { $lte: Number(maxPrice) };
    if (q) {
      filter.$or = [
        { name: new RegExp(String(q), "i") },
        { description: new RegExp(String(q), "i") },
        { category: new RegExp(String(q), "i") }
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return next(error);
  }
});

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(normalizeProduct(req.body));
    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      normalizeProduct(req.body),
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
