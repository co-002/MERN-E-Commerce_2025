import express from "express";
import { register, login, users, profile } from "../controllers/user.js";
import {Authenticated} from "../middlewares/isAuthenticated.js"

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get all users
router.get("/all", users);

router.get("/profile", Authenticated, profile)

export default router;