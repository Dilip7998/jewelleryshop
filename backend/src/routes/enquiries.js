const router = require("express").Router();
const Enquiry = require("../models/Enquiry");
const { requireAdmin } = require("../middleware/auth");
const { sendEnquiryNotification } = require("../utils/mailer");

router.post("/", async (req, res, next) => {
  try {
    const { name, phone, email, message, productId } = req.body;
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: "All enquiry fields are required" });
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      email,
      message,
      productId: productId || ""
    });

    let notificationSent = false;
    try {
      notificationSent = await sendEnquiryNotification(enquiry);
      if (!notificationSent) {
        console.warn("Enquiry saved, but SMTP email notifications are not configured");
      }
    } catch (error) {
      console.warn("Enquiry email notification failed:", error.message);
    }

    return res.status(201).json({ success: true, notificationSent });
  } catch (error) {
    return next(error);
  }
});

router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(100);
    return res.json(enquiries);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
