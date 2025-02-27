import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const data = await login( email, password);
    setFormData({
      email: "",
      password: "",
    });
    if(data.success){
      navigate("/");
    }
  };
  return (
    <>
      <div className="container section-padding">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <form className="registration-form" onSubmit={submitHandler}>
              <h1 className="mb-4">User Login</h1>
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
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
