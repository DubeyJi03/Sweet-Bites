const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoute");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// 💡 Explicit CORS Configuration to resolve the error
const corsOptions = {
    origin: 'https://sweet-bites-tau.vercel.app', // Replace this with your Vercel frontend domain
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    credentials: true, // This allows cookies and authorization headers to be sent
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("WELCOME TO CREAMYCAKE&CO API!");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);
app.use("/api/contact", contactRoutes);

// Admin Routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});