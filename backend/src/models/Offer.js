const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    type: {
      type: String,
      enum: ["Festival Offer", "Limited Time", "New Arrival"],
      required: true
    },
    discountPercent: { type: Number, required: true, min: 0, max: 95 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    cta: { type: String, default: "Explore Collection", trim: true, maxlength: 60 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
