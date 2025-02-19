import userModel from "../models/userModel.js"

const addToCart = async(req,res)=>{



try {

    const {userId,itemId,size}=req.body

const userData=await userModel.findById(userId)
let cartData= await userData.cartData;
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1
        }
        else
        {
            cartData[itemId][size]=1
        }
    }
    else
    {
        cartData[itemId]={}
        cartData[itemId][size]=1
    }
    
    await userModel.findByIdAndUpdate(userId,{cartData})
    
    res.json({success: true,message:"Added to Cart"})
} catch (error) {
    console.log(error)
    res.json({sucess:false,message:error.message})
    
}
}


const updateCart = async(req,res)=>{
try {
    const {userId,itemId,size,quantity}=req.body

    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData;

    cartData[itemId][size]=quantity

    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({success: true,message:"Cart Updated"})
} catch (error) {
    console.log(error)
    res.json({success:false,message: error.message})
}
}

const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body; // `itemId` refers to the product ID

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        delete cartData[itemId]; // Remove the product object

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.json({ success: true, message: "Item removed from cart." });
        console.log(cartData)
        console.log("hello")
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};




const getUserCart = async(req,res)=>{
    try {
        const {userId}=req.body
    
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
    
    
        res.json({success: true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
    }

export {addToCart,updateCart,getUserCart,removeFromCart}