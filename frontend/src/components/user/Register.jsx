import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register } = useContext(AppContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.password.length < 4) {
      setError("Password length must be 8 character long");
      return;
    }
    if (formData.confirmPassword !== formData.password) {
      setError("Password and Confirm password mismatch");
      return;
    }
    const { name, email, password } = formData;
    const data = await register(name, email, password);
    setError("")
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    if(data.success){
      navigate("/login");
    }
  };
  return (
    <>
      <div className="container section-padding">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <form className="registration-form" onSubmit={submitHandler}>
              <h1 className="mb-4">Registration Form</h1>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  aria-describedby="name"
                  onChange={onChangeHandler}
                  required
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  aria-describedby="emailHelp"
                  onChange={onChangeHandler}
                  required
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  id="password"
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <p className="text-danger">{error.length > 0 ? error : ""}</p>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
