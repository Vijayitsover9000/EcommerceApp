import express from "express";
import {registerController, 
        loginController,
        testController,
        forgotPasswordController,
        updateProfileController,
        getOrdersController,
        getAllOrdersController,
        orderStatusController
} from '../controllers/authController.js';
import {isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing

//register || METHOD POST
router.post('/register',registerController)

// LOGIN || POST
router.post('/login', loginController);

//Forgot Password
router.post('/forgot-password', forgotPasswordController)


//test routes
router.get('/test',requireSignIn ,isAdmin,testController);

//protected user route
router.get('/user-auth', requireSignIn, (req,res) =>{
        res.status(200).send({ok: true});
})

//protected admin route
router.get('/admin-auth', requireSignIn, isAdmin , (req,res) =>{
        res.status(200).send({ok: true});
})

// update profile
router.put('/profile',requireSignIn, updateProfileController);


// Orders
router.get('/orders', requireSignIn, getOrdersController);

//Get All  Orders
router.get('/all-orders', requireSignIn, isAdmin,getAllOrdersController);


// Orders status update route
router.put('/order-status/:orderId', requireSignIn, isAdmin,orderStatusController);
export default router