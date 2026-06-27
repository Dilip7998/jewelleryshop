const mongoose = require("mongoose");

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "NewsletterSubscriber",
  newsletterSubscriberSchema
);
