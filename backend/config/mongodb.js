import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/eCommerce')

mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error',(err)=>{
    console.error('Connection Error: ',err);
})

export default mongoose;
