import express from "express";
import { addToCart, userCart, removeProductFromCart, clearCart, decreaseProductQty } from "../controllers/cart.js";
import {Authenticated} from "../middlewares/isAuthenticated.js"

const router = express.Router();

// Add to cart
router.post("/add", Authenticated, addToCart);

// Get user cart
router.get("/user", Authenticated, userCart);

// Product removed from cart
router.delete("/remove/:productId", Authenticated, removeProductFromCart);

// Clear cart
router.delete("/clear", Authenticated, clearCart);

// Decrease item quantity from cart
router.post("/--qty", Authenticated, decreaseProductQty);

export default router;