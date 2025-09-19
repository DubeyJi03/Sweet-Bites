const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    longDescription: { type: String },
    price: { type: Number },
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
        url: { type: String, required: false }, // <-- Change required to false
        altText: { type: String },
      },
    ],
    availability: { type: Boolean, default: true },
    stock: { type: Number },
    ingredients: [String],
    tags: [String],
    rating: { type: Number },
    reviewCount: { type: Number },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    sku: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);