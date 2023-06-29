import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//Protected Routes token base
export const requireSignIn = async(req,res,next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
        
    } catch (error) {
        console.log(error);
    }
}

// admin access
export const isAdmin = async(req, res, next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !==1)
            return  res.status(201).send({
                success: false,
                message :'Unauthorized Access',
                ok: false
            })
        else{
            next();
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error in admin middleware'
        });
        
    }
}