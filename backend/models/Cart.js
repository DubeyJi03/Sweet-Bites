const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Made user optional for guest carts
    guestId: { type: String, unique: true, sparse: true }, // Added guestId field
    products: [ // Changed from 'items' to 'products' to match your routes
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String }, // Added to match cartRoutes.js
        image: { type: String }, // Added to match cartRoutes.js
        price: { type: Number, required: true }, // Added to match cartRoutes.js
        weights: { type: String }, // Added to match cartRoutes.js
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, default: 0 }, // Added to match cartRoutes.js
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);