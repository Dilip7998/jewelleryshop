const router = require("express").Router();
const NewsletterSubscriber = require("../models/NewsletterSubscriber");

router.post("/", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    if (!email) return res.status(400).json({ message: "Email is required" });

    await NewsletterSubscriber.findOneAndUpdate(
      { email },
      { email },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json({ success: true });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
