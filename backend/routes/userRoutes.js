const express = require("express");
const User = require("../models/User");
const Address = require("../models/Address");
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
//  @access Public
router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    try {
        // Registration Logic
        let user = await User.findOne({email});

        if (user) return res.status(400).json({message: "User already exists"});

        user = new User({name, email, password });
        await user.save();

        //  Create JWT Payload
        const payload = {user: {id: user._id, role: user.role} };

        //  sign and return the token along with the user data
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "40h"}, (err, token) => {
            if(err) throw err;

            // send the user and token in response
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            })
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// @route POST /api/users/login
// @desc authenticate user
//  @access public
router.post("/login", async (req, res) =>{
    const {email,password}= req.body;

    try {
        // Find the user by email
        let user = await User.findOne({email});

        if(!user) return res.status(400).json({message: "Invalid Credentails"});
        const isMatch = await user.matchPassword(password);

        if(!isMatch) return res.status(400).json({message: "Invalid Credentails"});

        //  Create JWT Payload
        const payload = {user: {id: user._id, role: user.role} };

        //  sign and return the token along with the user data
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "40h"}, (err, token) => {
            if(err) throw err;

            // send the user and token in response
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        },
    );

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// @route GET /api/users/profile
// @desc GET logged-in user's profile (Protected Route)
// @access Private
router.get("/profile",protect, async (req,res) => {
    res.json(req.user);
});

// @route PUT /api/users/profile
// @desc Update user profile
// @access Private
router.put("/profile", protect, async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Check if email is being changed and if it's already taken
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }
        
        // Update fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        
        if (password) {
            user.password = password;
        }
        
        const updatedUser = await user.save();
        
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            role: updatedUser.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route DELETE /api/users/profile
// @desc Delete user account
// @access Private
router.delete("/profile", protect, async (req, res) => {
    try {
        // Delete user's addresses
        await Address.deleteMany({ user: req.user._id });
        
        // Delete user's orders (optional - you might want to keep them for records)
        // await Order.deleteMany({ user: req.user._id });
        
        // Delete the user
        await User.findByIdAndDelete(req.user._id);
        
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
