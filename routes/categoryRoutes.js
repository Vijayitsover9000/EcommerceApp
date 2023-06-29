import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singlecategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
const router = express.Router();

// routes
// create-category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get all category
router.get("/categories", categoryController);

// single category
router.get("/single-category/:slug", singlecategoryController);

//delete single category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController);

export default router;
