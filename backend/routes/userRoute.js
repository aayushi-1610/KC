import express from 'express'
const userRouter = express.Router();
import {registerUser,adminLogin,loginUser} from "../controllers/userController.js"
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

export default userRouter;