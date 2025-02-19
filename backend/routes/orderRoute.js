import express from "express";
import { placeOrder,updateStatus,allOrders,userOrders } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router()

//admin features
orderRouter.get('/list',allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//payment features
orderRouter.post('/place',authUser,placeOrder);


//user Feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter

