import express from "express"
import bodyParser from 'body-parser'
import cors from "cors"
import mongoose from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
dotenv.config();

const app =express()
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT || 5000
app.use("/uploads", express.static("uploads")); // If using file uploads

connectCloudinary();

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter)

app.get('/',(req,res)=>{
    res.send("Hello world from Server")
})

app.listen(port,()=>{
    console.log(`Server is running on : http://localhost:${port}`)
})

