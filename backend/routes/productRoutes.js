// Filename: productRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Helper: Format images into { url, altText }
 */
const formatImages = (images = [], name = "") => {
  const baseUrl = process.env.BASE_URL || "http://localhost:9000"; // ✅ fallback
  return images.map((img) => {
    if (!img) return null; // filter out bad values
    if (typeof img === "string") {
      return {
        url: img.startsWith("http") ? img : `${baseUrl}/uploads/${img}`,
        altText: name || "Product Image",
      };
    } else {
      return {
        url: img.url?.startsWith("http")
          ? img.url
          : `${baseUrl}/uploads/${img.url}`,
        altText: img.altText || name || "Product Image",
      };
    }
  }).filter(Boolean);
};

/**
 * @route   POST /api/products
 * @desc    Create Product
 * @access  Private/Admin
 */
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      weights,
      collections,
      sweetType,
      types,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      weights,
      collections,
      sweetType,
      types,
      images: formatImages(images, name),
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
      sold: 0, // ✅ initialize sales count
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Product creation failed:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update Product
 * @access  Private/Admin
 */
router.put("/:id", protect, admin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      weights,
      collections,
      sweetType,
      types,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      sold,
    } = req.body;

    // ✅ Safe field updates
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.countInStock = countInStock ?? product.countInStock;
    product.category = category ?? product.category;
    product.weights = weights ?? product.weights;
    product.collections = collections ?? product.collections;
    product.sweetType = sweetType ?? product.sweetType;
    product.types = types ?? product.types;
    product.images = images
      ? formatImages(images, name || product.name)
      : product.images;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.isPublished = isPublished ?? product.isPublished;
    product.tags = tags ?? product.tags;
    product.dimensions = dimensions ?? product.dimensions;
    product.weight = weight ?? product.weight;
    product.sku = sku ?? product.sku;
    product.sold = sold ?? product.sold;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete Product
 * @access  Private/Admin
 */
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    console.error("Delete product error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * @route   GET /api/products
 * @desc    Get all products with filters
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const {
      category,
      collection,
      types,
      sweetType,
      weights,
      minPrice,
      maxPrice,
      sortBy,
      search,
      limit,
    } = req.query;

    let query = { isPublished: true };

    if (category && category.toLowerCase() !== "all") query.category = category;
    if (collection && collection.toLowerCase() !== "all")
      query.collections = { $in: [collection] };
    if (types && types.toLowerCase() !== "all") query.types = { $in: [types] };
    if (sweetType && sweetType.toLowerCase() !== "all")
      query.sweetType = sweetType;
    if (weights) query.weights = { $in: weights.split(",") };

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    let sort = {};
    switch (sortBy) {
      case "priceAsc":
        sort = { price: 1 };
        break;
      case "priceDesc":
        sort = { price: -1 };
        break;
      case "newest":
        sort = { createdAt: -1 };
        break;
      case "oldest":
        sort = { createdAt: 1 };
        break;
      case "name":
        sort = { name: 1 };
        break;
      case "featured":
        sort = { isFeatured: -1, createdAt: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * @route   GET /api/products/best-seller
 * @desc    Retrieve top 10 best-selling products
 * @access  Public
 */
router.get("/best-seller", async (req, res) => {
  try {
    const bestSellers = await Product.find({ isPublished: true })
      .sort({ sold: -1 })
      .limit(10);

    if (bestSellers.length > 0) {
      res.json(bestSellers);
    } else {
      res.status(404).json({ message: "No best-selling products found" });
    }
  } catch (error) {
    console.error("Best-seller error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * @route   GET /api/products/new-arrivals
 * @desc    Retrieve latest 8 products
 * @access  Public
 */
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error("New arrivals error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Get product by ID error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * @route   GET /api/products/similar/:id
 * @desc    Retrieve similar products
 * @access  Public
 */
router.get("/similar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const similarProducts = await Product.find({
      _id: { $ne: id },
      sweetType: product.sweetType,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error("Similar products error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
