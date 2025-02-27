import express from "express";
import { addProduct, getProducts, getProductById, updateProductById, deleteProductById } from "../controllers/product.js";

const router = express.Router();

// Add product
router.post("/add", addProduct);

// Get All products
router.get('/all', getProducts);

// Get product by ID
router.get('/:id', getProductById);

// Get product by ID
router.put('/:id', updateProductById);

// Get product by ID
router.delete('/:id', deleteProductById);

export default router;
