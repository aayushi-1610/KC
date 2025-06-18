// index.js or server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: "https://kc-frontend.vercel.app", // Allow only your frontend
  credentials: true // optional if you're using cookies/auth
}));
app.use("/uploads", express.static("uploads")); // Optional if using file uploads

// Connect Cloudinary
connectCloudinary();

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello world from Server");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
