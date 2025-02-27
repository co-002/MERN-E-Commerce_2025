import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link, Links } from "react-router-dom";

function Cart() {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState("");
  const [totalQty, setTotalQty] = useState("");

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
  return (
    <>
      <div className="container section-padding">
        <div className="total text-center mb-4">
          <h4>Total Price: {totalPrice}₹</h4>
          <h4>Total Quantity: {totalQty}</h4>
          {
            cart?.items?.length <=0 && (
              <Link to={"/"} className="btn btn-warning text-light mt-3">Continue Shopping</Link>
            )
          }
        </div>
        {cart?.items?.map((item) => {
          return (
            <div
              key={item.productId}
              className="row border border-2 border-dark py-2 my-2 myCart"
            >
              <div className="col-lg-4">
                <img src={item.imgSrc} width="100" alt="" />
              </div>
              <div className="col-lg-4 d-flex flex-column justify-content-center align-items-start">
                <h5 className="mb-0">{item.title}</h5>
                <p className="mb-0">Price: {item.price} ₹</p>
                <p className="mb-0">QTY: {item.qty}</p>
              </div>
              <div className="col-lg-4 d-flex justify-content-end align-items-center">
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
                <button
                  onClick={() => decreaseQty(item.productId, 1)}
                  className="bg-warning text-light px-3 py-1 rounded mx-1 border border-0"
                >
                  Decrease
                </button>
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
              </div>
            </div>
          );
        })}

        {cart?.items?.length > 0 && (
          <div className="checkout-remove-btns text-center mt-4">
            <Link to={"/shipping"} className="btn btn-warning mx-2 text-light" >Checkout</Link>
            <button
              className="btn btn-danger mx-2"
              onClick={() => {
                if (confirm("Are you sure to want to clear your cart?")) {
                  clearCart();
                }
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
