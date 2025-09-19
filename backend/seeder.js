const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

// connect to mongoose
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    // clear the existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Assign the default user ID to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((p) => ({ ...p, user: userID }));
    
    // insert all products
    await Product.insertMany(sampleProducts); // Corrected line

    console.log("✅ Data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();