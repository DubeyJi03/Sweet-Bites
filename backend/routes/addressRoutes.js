const express = require("express");
const Address = require("../models/Address");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/addresses
// @desc Get all addresses for logged in user
// @access Private
router.get("/", protect, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/addresses
// @desc Create a new address
// @access Private
router.post("/", protect, async (req, res) => {
  try {
    const { title, fullName, phone, address, city, state, pinCode, country, isDefault } = req.body;

    const newAddress = new Address({
      user: req.user._id,
      title,
      fullName,
      phone,
      address,
      city,
      state,
      pinCode,
      country,
      isDefault,
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/addresses/:id
// @desc Update an address
// @access Private
router.put("/:id", protect, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Check if the address belongs to the logged in user
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/addresses/:id
// @desc Delete an address
// @access Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Check if the address belongs to the logged in user
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/addresses/:id/set-default
// @desc Set an address as default
// @access Private
router.put("/:id/set-default", protect, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Check if the address belongs to the logged in user
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Remove default status from all other addresses
    await Address.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );

    // Set this address as default
    address.isDefault = true;
    await address.save();

    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
