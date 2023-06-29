import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// routes

// create product routes          Create
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update product route          Update
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get product               Read
router.get("/get-product", getProductController);
// single product
router.get("/get-product/:slug", getSingleProductController);
//get photo
router.get("/product-photo/:pid",  productPhotoController);

// delete product 
router.delete('/delete-product/:pid', requireSignIn, isAdmin,deleteProductController);

// filter product
router.post('/product-filters',productFiltersController)

//product count 
router.get('/product-count', productCountController)

// product per page
router.get('/product-list/:page', productListController)


// search product 
router.get('/search/:keyword', searchProductController)

// similar products
router.get('/related-product/:pid/:cid', relatedProductController)

// category wise product
router.get('/product-category/:slug', productCategoryController);

// PAYMENTS ROUTES
// 1. token
router.get('/braintree/token' , braintreeTokenController);

// 2, Payments
router.post('/braintree/payment', requireSignIn , braintreePaymentController);

export default router;


















