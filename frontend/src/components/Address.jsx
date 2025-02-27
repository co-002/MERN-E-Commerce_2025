import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Address() {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { shippingAddress, userAddress } = useContext(AppContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (formData.pincode.length < 6 || formData.pincode.length > 6) {
      setError("Wrong Pincode");
      return;
    }
    if (formData.phone.length < 10 || formData.phone.length > 10) {
      setError("Wrong Phone number");
      return;
    }

    setError("");
    const data = await shippingAddress(
      formData.fullName,
      formData.country,
      formData.state,
      formData.city,
      formData.pincode,
      formData.phone,
      formData.address
    );
    if (data.success) {
      navigate("/checkout");
    }
    setFormData({
      fullName: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="container section-padding">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-12">
          <form className="address-form" onSubmit={submitHandler}>
            <h1 className="mb-4 text-lg-start text-center">Shipping Address</h1>

            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">
                Pincode
              </label>
              <input
                type="text"
                className="form-control"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
                rows="3"
                required
              ></textarea>
            </div>

            <p className="text-danger">{error.length > 0 ? error : ""}</p>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary mx-2">
                Proceed to Checkout
              </button>
              {userAddress && (
                <button
                  type="submit"
                  onClick={() => navigate("/checkout")}
                  className="btn btn-warning mx-2 text-light"
                >
                  Use Old Address
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Address;
