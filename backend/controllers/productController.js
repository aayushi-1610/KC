import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add a product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Extracting images
        const images = ["image1", "image2", "image3", "image4"]
            .map((key) => req.files[key]?.[0])
            .filter(Boolean); // Removes undefined values

        // Upload images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Construct product data
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            images: imagesUrl,
            date: Date.now(),
        };

        console.log(productData);

        // Save product to database
        const product = new productModel(productData);
        await product.save();

        return res.json({ success: true, message: "Product added" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Function to list all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.json({ success: true, products }); // ✅ Added return
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message }); // ✅ Proper error response
    }
};

// Function to remove a product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message }); // ✅ Proper error response
    }
};

// Function to get single product details
const singleProduct = async (req, res) => {
    try {
        
        const {productId}=req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
};

export { listProducts, addProduct, removeProduct, singleProduct };
