const mongoose = require("mongoose");
const router = require("express").Router();
const Offer = require("../models/Offer");
const { requireAdmin } = require("../middleware/auth");

function normalizeOffer(body) {
  return {
    title: body.title,
    type: body.type,
    discountPercent: Number(body.discountPercent || 0),
    description: body.description,
    cta: body.cta || "Explore Collection",
    active: body.active !== false
  };
}

router.get("/", async (req, res, next) => {
  try {
    const offers = await Offer.find({ active: true }).sort({ createdAt: -1 });
    return res.json(offers);
  } catch (error) {
    return next(error);
  }
});

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const offer = await Offer.create(normalizeOffer(req.body));
    return res.status(201).json(offer);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid offer id" });
    }

    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      normalizeOffer(req.body),
      { new: true, runValidators: true }
    );

    if (!offer) return res.status(404).json({ message: "Offer not found" });
    return res.json(offer);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid offer id" });
    }

    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
