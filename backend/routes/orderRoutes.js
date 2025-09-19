const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged in user orders with product details
// @access Private
router.get("/my-orders", protect, async (req, res) => {
    try {
        // Find orders for the authenticated user and populate orderItems with product details
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate({
                path: 'orderItems.productId', // ✅ FIX: Populate the product details within orderItems
                model: 'Product', // specify the model
            });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @router GET /api/orders/:id
// @desc Get order details by ID
// @access Private
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email")
            .populate({ // ✅ FIX: Populate the product details within orderItems
                path: 'orderItems.productId',
                model: 'Product',
            });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Return the full order details
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;