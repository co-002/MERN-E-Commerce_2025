import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";

function OderConfirmation() {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState();
  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder.orders);
    }
  }, [userOrder]);
  return (
    <>
      <div className="container section-padding">
        <div className="row">
          <h1 className="text-center">Order Summary</h1>
          <div className="col-lg-5 col-12 mt-4 px-0">
            <div className="text-center bg-white border border-1">
              <h3 className="mb-0 py-3">Order Items</h3>
            </div>
            <table className="table table-bordered mb-0">
              <thead>
                <tr></tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <div className="col-lg-7 col-12 mt-lg-4 mt-0 px-0 bg-white border border-1">
            <div className="text-center border border-1">
              <h3 className="mb-0 py-3">Order Details & Shipping Address</h3>
            </div>
            <div>
              <ul className="fw-bold">
                <li>OrderId: {latestOrder?.orderId}</li>
                <li>PaymentId: {latestOrder?.paymentId}</li>
                <li>Payment Status: {latestOrder?.payStatus}</li>
                <li>Address: {latestOrder?.userShippping?.address}</li>
                <li>City: {latestOrder?.userShippping?.city}</li>
                <li>Country: {latestOrder?.userShippping?.country}</li>
                <li>Created Date: {latestOrder?.userShippping?.createdAt}</li>
                <li>Phone: {latestOrder?.userShippping?.phoneNumber}</li>
                <li>Pincode: {latestOrder?.userShippping?.pincode}</li>
                <li>State: {latestOrder?.userShippping?.state}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-secondary">Proceed to Pay</button>
        </div>
      </div>
    </>
  );
}

export default OderConfirmation;
