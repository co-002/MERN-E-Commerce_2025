import express from "express";
import { checkout, verify, userOrder, allOrder } from "../controllers/payment.js";
import { Authenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/checkout", checkout);

router.post("/verify", verify)

router.get("/userOrder", Authenticated, userOrder)

router.post("/orders", allOrder)

export default router;
