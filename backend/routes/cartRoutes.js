// Filename: cartRoutes.js

const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose"); // ✅ Import mongoose
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function for dynamic pricing on the backend
const calculatePrice = (basePricePerKg, weight) => {
    const weightNumber = parseFloat(weight);
    if (isNaN(weightNumber)) {
        return basePricePerKg;
    }

    let weightInKg;
    if (weight.toLowerCase().includes("kg")) {
        weightInKg = weightNumber;
    } else if (weight.toLowerCase().includes("g")) {
        weightInKg = weightNumber / 1000;
    } else {
        return basePricePerKg;
    }
    return basePricePerKg * weightInKg;
};

// @route POST /api/cart
// @desc add product to cart (guest or logged in user)
// @access Public
router.post("/", async (req, res) => {
    try {
        const { productId, quantity, weights, guestId, userId } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const basePrice = product.basePrice || product.price;
        if (typeof basePrice !== 'number' || isNaN(basePrice)) {
            console.error("Product has no valid basePrice or price:", product);
            return res.status(500).json({ message: "Server Error: Product price is invalid or missing." });
        }

        const imageUrl = product.images?.[0]?.url || "";
        const weightsOption = product.weights?.find((w) => w === weights);

        if (!weightsOption) {
            return res.status(400).json({ message: `Invalid weight option: ${weights}` });
        }

        const selectedPrice = calculatePrice(basePrice, weights);

        let cart;
        if (userId) {
            cart = await Cart.findOne({ user: userId });
        } else if (guestId) {
            cart = await Cart.findOne({ guestId });
        }

        // ✅ Corrected Logic: If cart exists, find and update or push
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId.toString() && p.weights === weights
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: imageUrl,
                    price: selectedPrice,
                    weights,
                    quantity,
                });
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            // ✅ Return the cart response
            res.status(200).json(cart);
        } else {
            // ✅ Logic for creating a new cart
            const cartData = {
                products: [{
                    productId,
                    name: product.name,
                    image: imageUrl,
                    price: selectedPrice,
                    weights,
                    quantity,
                }],
                totalPrice: selectedPrice * quantity,
            };

            if (userId) {
                cartData.user = userId;
            } else {
                cartData.guestId = guestId || "guest_" + new Date().getTime();
            }

            const newCart = await Cart.create(cartData);
            // ✅ Return the new cart response
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// @route PUT /api/cart
// @desc update product quantity in cart for a guest or logged in user
// @access public
router.put("/", async (req, res) => {
    const { productId, quantity, weights, guestId, userId } = req.body;
    
    // Validate required fields
    if (!productId || !weights || quantity === undefined) {
        return res.status(400).json({ message: "Missing required fields: productId, quantity, weights" });
    }
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid productId" });
    }
    
    try {
        let cart;
        if (userId) {
            cart = await Cart.findOne({ user: userId });
        } else if (guestId) {
            cart = await Cart.findOne({ guestId });
        }

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId.toString() && p.weights === weights
        );

        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }

            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// @route DELETE /api/cart
// @desc Remove a product from a cart (guest or logged in user)
// @access Public
router.delete("/", async (req, res) => {
    const { productId, weights, guestId, userId } = req.body;

    // Validate required fields
    if (!productId || !weights) {
        return res.status(400).json({ message: "Missing required fields: productId, weights" });
    }
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid productId" });
    }

    try {
        let cart;
        if (userId) {
            cart = await Cart.findOne({ user: userId });
        } else if (guestId) {
            cart = await Cart.findOne({ guestId });
        }

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId.toString() && p.weights === weights
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// @route GET /api/cart
// @desc Get Logged-in user's or guest user's cart
// @access Public
router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        let cart;
        if (userId) {
            cart = await Cart.findOne({ user: userId });
        } else if (guestId) {
            cart = await Cart.findOne({ guestId });
        }

        if (cart) {
            res.json(cart);
        } else {
            return res.status(200).json({ products: [], totalPrice: 0 });
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// @route POST /api/cart/merge
// @desc merge guest cart into user cart after login
// @access Private (requires JWT)
router.post("/merge", protect, async (req, res) => {
    try {
        const { guestId } = req.body;
        const userId = req.user._id;

        if (!guestId) {
            return res.status(400).json({ message: "guestId is required" });
        }

        const guestCart = await Cart.findOne({ guestId });
        let userCart = await Cart.findOne({ user: userId });

        if (!guestCart) {
            return res.status(404).json({ message: "Guest cart not found" });
        }

        if (!userCart) {
            guestCart.user = userId;
            guestCart.guestId = null;
            await guestCart.save();
            return res.status(200).json(guestCart);
        }

        guestCart.products.forEach((guestProduct) => {
            const index = userCart.products.findIndex(
                (p) => p.productId.toString() === guestProduct.productId.toString() && p.weights === guestProduct.weights
            );

            if (index > -1) {
                userCart.products[index].quantity += guestProduct.quantity;
            } else {
                userCart.products.push(guestProduct);
            }
        });

        userCart.totalPrice = userCart.products.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        await userCart.save();
        await Cart.deleteOne({ _id: guestCart._id });

        return res.status(200).json(userCart);
    } catch (error) {
        console.error("Error merging cart:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;