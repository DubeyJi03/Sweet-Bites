// Filename: productRoutes.js
const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

// @route POST /api/products
// @desc Create Product
// @access Private/Admin
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
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Product creation failed:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/products/:id
// @desc Update product
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
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

    // Check for valid ObjectId before query
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.weights = weights || product.weights;
      product.collections = collections || product.collections;
      product.sweetType = sweetType || product.sweetType;
      product.types = types || product.types;
      product.images = images || product.images;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/products/:id
// @desc Delete product
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Check for valid ObjectId before query
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      return res.status(200).json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products
// @desc Get all products with filters
// @access Public
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

    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    if (collection && collection.toLowerCase() !== "all") {
      query.collections = { $in: [collection] };
    }

    if (types && types.toLowerCase() !== "all") {
      query.types = { $in: [types] };
    }

    if (sweetType && sweetType.toLowerCase() !== "all") {
      query.sweetType = sweetType;
    }

    if (weights) {
      query.weights = { $in: weights.split(",") };
    }

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
    if (sortBy) {
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
          break;
      }
    } else {
      sort = { createdAt: -1 };
    }

    let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);

    console.log('Query:', JSON.stringify(query));
    console.log('Sort:', JSON.stringify(sort));
    console.log('Found products:', products.length);

    res.json(products);
  } catch (error) {
    console.error('GET /api/products error:', error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route GET /api/products/best-seller
// @desc Retrieve the best-selling product
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    // Aggregate products to find the one with the highest 'sold' count
    const bestSeller = await Product.aggregate([
      {
        // Assuming 'sold' is a field that tracks total sales
        $sort: { sold: -1 } 
      },
      {
        // Limit to the top 1 product
        $limit: 1 
      }
    ]);

    // Check if the aggregation returned a product
    if (bestSeller.length > 0) {
      res.json(bestSeller[0]);
    } else {
      res.status(404).json({ message: "No best-selling product found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route GET /spi/products/new-arrivals
// @desc retrieve latest 8 products - Creation date
// @access Public
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/:id
// @desc get a single product by ID
// @ access Public
router.get("/:id", async (req, res) => {
  try {
    // Check for valid ObjectId before query
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
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/similar/:id
// @desc retrieve similar products based on the current products type and category
// @access public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Check for valid ObjectId before query
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: id }, //exclude the current product id
      sweetType: product.sweetType,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


module.exports = router;