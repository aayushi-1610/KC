import mongoose from "mongoose";

// mongodb.js

// Replace with your actual MongoDB Atlas connection string
const uri = 'mongodb+srv://u23cs035:a1a2y3u4@cluster0.yycdswi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
