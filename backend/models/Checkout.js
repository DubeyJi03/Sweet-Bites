const mongoose = require("mongoose");
const Product = require("./Product");

const checkoutItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    weights: { // ✅ ADDED: A weight field to match the frontend component's data
        type: String,
        required: true,
    },
}, { _id: false });

const checkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    checkoutItems: [checkoutItemSchema],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        pinCode: { type: String, required: true },
        country: { type: String, required: true },
        firstName: { type: String, required: true }, // ✅ ADDED: Missing from original schema
        lastName: { type: String, required: true }, // ✅ ADDED: Missing from original schema
        phone: { type: String, required: true }, // ✅ ADDED: Missing from original schema
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false, // ✅ FIXED: Changed 'defaultL' to 'default'
    },
    paidAt: {
        type: Date,
    },
    paymentStatus: {
        type: String,
        default: "pending",
    },
    paymentDetails: {
        type: mongoose.Schema.Types.Mixed,
    },
    isFinalized: {
        type: Boolean,
        default: false,
    },
    finalizedAt: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model("Checkout", checkoutSchema);