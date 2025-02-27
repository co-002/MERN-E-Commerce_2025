import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function Checkout() {
  const {
    cart,
    decreaseQty,
    addToCart,
    removeFromCart,
    userAddress,
    url,
    user,
    clearCart,
  } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState("");
  const [totalQty, setTotalQty] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setTotalPrice(price);
    setTotalQty(qty);
  }, [cart]);
  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(
        `${url}/payment/checkout`,
        {
          amount: totalPrice,
          cartItems: cart?.items,
          userShippping: userAddress,
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      const { orderId, amount } = orderResponse.data;
      const options = {
        key: "rzp_test_B4gDXubVFSBwIn",
        amount: amount,
        currency: "INR",
        name: "MERN_E-Commerce",
        description: "E-commerce project",
        order_id: orderId,
        handler: async function (res) {
          const paymentData = {
            orderId: res.razorpay_order_id,
            paymentId: res.razorpay_payment_id,
            signature: res.razorpay_payment_signature,
            amount: amount,
            orderItems: cart?.items,
            userId: user._id,
            userShippping: userAddress,
          };
          const api = await axios.post(`${url}/payment/verify`, paymentData, {
            headers: {
              "Content-Type": "Application/json",
            },
            withCredentials: true,
          });
          if (api.data.success) {
            clearCart();
            navigate("/orderConfirm");
          }
        },
        // callback_url: "http://localhost:3000/payment-success",
        prefill: {
          name: "MERN_E-Commerce",
          email: "aniket@gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container section-padding">
        <div className="row">
          <h1 className="text-center">Order Summary</h1>
          <div className="col-lg-8 col-12 mt-4 px-0">
            <div className="text-center bg-white border border-1">
              <h3 className="mb-0 py-3">Product's Details</h3>
            </div>
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th scope="col">Product Img</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Qty++</th>
                  <th scope="col">Qty--</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart?.items?.map((item) => {
                  return (
                    <tr key={item.productId}>
                      <td>
                        <img src={item.imgSrc} width="100" alt="" />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>{item.qty}</td>
                      <td>
                        <button
                          onClick={() =>
                            addToCart(
                              item.productId,
                              item.title,
                              item.price / item.qty,
                              1,
                              item.imgSrc
                            )
                          }
                          className="bg-info text-light px-3 py-1 rounded mx-1 border border-0"
                        >
                          Increase
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => decreaseQty(item.productId, 1)}
                          className="bg-warning text-light px-3 py-1 rounded mx-1 border border-0"
                        >
                          Decrease
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            if (confirm("Are you sure, you want to remove")) {
                              removeFromCart(item.productId);
                            }
                          }}
                          className="bg-danger text-light px-3 py-1 rounded mx-1 border border-0"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td></td>
                  <td>
                    <button className="btn btn-success text-light">
                      Total
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-warning text-light">
                      {totalPrice}
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-info text-light">
                      {totalQty}
                    </button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-lg-4 col-12 mt-lg-4 mt-0 px-0 bg-white border border-1">
            <div className="text-center border border-1">
              <h3 className="mb-0 py-3">Shipping Address</h3>
            </div>
            <div>
              <ul className="fw-bold">
                <li>Name: {userAddress?.fullName}</li>
                <li>Phone: {userAddress?.phoneNumber}</li>
                <li>Country: {userAddress?.country}</li>
                <li>Stete: {userAddress?.state}</li>
                <li>City: {userAddress?.city}</li>
                <li>Pincode: {userAddress?.pincode}</li>
                <li>Address: {userAddress?.address}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-secondary" onClick={handlePayment}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
