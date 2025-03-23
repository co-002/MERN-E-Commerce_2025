import express from "express";
import connectDb from "./db_connection.js";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import addressRouter from "./routes/address.js";
import paymentRouter from "./routes/payment.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

const app = express();

// Buildin middlewares
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
const _dirname = path.resolve();

// Calling database connection method
connectDb();

// User Router
app.use("/api/user", userRouter);

// Product Router
app.use("/api/product", productRouter);

//Cart Router
app.use("/api/cart", cartRouter);

//Address router
app.use("/api/address", addressRouter);

// Payment router
app.use("/api/payment", paymentRouter);

app.listen(port, () => {
  // console.log("Server is running on port " + port);
});
