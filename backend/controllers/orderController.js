import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
const placeOrder=async(req,res)=>{


    try{

        const {userId,items,address}=req.body;

        const orderData={
            userId,
            items,
            address,
            date:Date.now()
        }
        const newOrder=new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})
    }catch(error)
    {
            console.log(error)
            res.json({success:false,message:error.message})
    }

}

const allOrders = async(req,res)=>{
    try{
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const userOrders=async(req,res)=>{
    try {
    const {userId}=req.body
    const orders=await orderModel.find({userId})
    res.json({success:true,orders})        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const updateStatus=async(req,res)=>{

}

export {placeOrder,allOrders,userOrders,updateStatus};