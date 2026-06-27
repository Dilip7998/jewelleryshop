const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    category: { type: String, required: true, trim: true, maxlength: 80, index: true },
    originalPrice: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, default: 0, min: 0, max: 95 },
    images: {
      type: [String],
      validate: {
        validator(value) {
          return value.length > 0;
        },
        message: "At least one product image is required"
      }
    },
    description: { type: String, required: true, trim: true, maxlength: 1200 },
    material: { type: String, default: "", trim: true, maxlength: 160 },
    sku: { type: String, default: "", trim: true, maxlength: 80 },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
