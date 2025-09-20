const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    longDescription: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discountPrice: { type: Number },
    discount: { type: Number },
    countInStock: { type: Number, default: 0 },
    category: { type: String },
    weights: [String],
    collections: { type: String },
    sweetType: { type: String },
    types: { type: String },
    images: [
      {
        url: { type: String, required: false }, 
        altText: { type: String },
      },
    ],
    availability: { type: Boolean, default: true },
    stock: { type: Number },
    ingredients: [String],
    tags: [String],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    sku: { type: String },
    sold: { type: Number, default: 0 }, // ✅ NEW FIELD for best-seller logic
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
