import { Payment } from "../modals/Payment.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_test_B4gDXubVFSBwIn",
  key_secret: "FWRTHKbudDEw3XXhJpVrDUEb",
});

export const checkout = async (req, res) => {
  try {
    const { amount, cartItems, userShippping, userId } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `Receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json({
      message: "Order created",
      success: true,
      orderId: order.id,
      amount: amount,
      cartItems,
      userId,
      payStatus: "Created",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try{
    const {orderId, paymentId, signature, amount, orderItems, userId, userShippping} = req.body;
    const payment = new Payment({orderId, paymentId, signature, amount, orderItems, userId, userShippping, payStatus: "Paid",})
    await payment.save();
    res.json({
      message: "Payment successfull",
      success: true,
      payment
    })
  }
  catch(error){
    res.json({
      message: error.message,
      success: false
    })
  }
};

export const userOrder = async (req, res) => {
  let userId = req.user._id.toString();
  let orders = await Payment.find({userId}).sort({orderDate: -1});
  res.json({
    orders,
    success: true
  })
}

export const allOrder = async (req, res) => {
  let orders = await Payment.find().sort({orderDate: -1});
  res.json({
    orders,
    success: true
  })
}