const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");
const multer = require("multer"); 

const router = express.Router();

// @route POST /api/admin/products
// @desc Create a new product (admin only)
// @access private/admin
router.post("/", protect, admin, async (req, res) => {
    try {
        const { name, price, description, sweetTypes, category, sku, image } = req.body;

        // Basic validation
        if (!name || !price || !sku) {
            return res.status(400).json({ message: "Name, price, and SKU are required fields." });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            sweetTypes,
            category,
            sku,
            image, 
            user: req.user._id,
        });

        const createdProduct = await newProduct.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route GET /api/admin/products
// @desc Get all products (admin only)
// @access private/admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route DELETE /api/admin/products/:id
// @desc Delete a product (admin only)
// @access private/admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Product removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;