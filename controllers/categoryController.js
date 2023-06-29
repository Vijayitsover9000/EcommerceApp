import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                success:false,
                message:"Name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            res.status(200).send({
                success:true,
                message:"Category already exists"
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save();
        return res.status(201).send({
            success:true,
            message:"Category Created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in Category Create"
        })
    }

}

// update category
 export const updateCategoryController = async(req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id , {name, slug:slugify(name)} , {new:true})
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in update category"
        })
        
    }
 }

 //get category
 export const categoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All category List",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: "error in getting all categories"
        })
        
    }

 }

 // single category 
 export const singlecategoryController = async(req,res)=>{
    try {
        const {slug} = req.params;
        const category = await categoryModel.findOne({slug});
        res.status(200).send({
            success:true,
            message:"Get single category success",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: "error in getting single categories"
        })
        
    }
 }

  // delete category 
  export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Delete single category success",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: "error in deleting single categories"
        })
        
    }
 }
  























