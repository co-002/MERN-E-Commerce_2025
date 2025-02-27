import express from "express"
import {addAddress, getAddress} from "../controllers/address.js"
import { Authenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Add Address
router.post("/add", Authenticated, addAddress)

// Get Address
router.get("/get", Authenticated, getAddress)

export default router;