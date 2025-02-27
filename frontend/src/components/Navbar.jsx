import React, { useContext, useState } from "react";
import {
  FaShoppingCart,
  FaUserAlt,
  FaUserPlus,
  FaSearch,
} from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const filterByCategory = (byCat, byPrice) => {
    if (byCat) {
      setFilteredData(
        products.filter(
          (data) => data.category.toLowerCase() === byCat.toLowerCase()
        )
      );
    } else {
      setFilteredData(products.filter((data) => data.price <= byPrice));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <>
      <div className="container-fluid sticky-top px-0">
        <div className="nav sticky-top px-lg-4 px-2">
          <div className="py-3 w-100 d-flex justify-content-between align-items-center">
            <div className="left">
              <Link to={"/"} className="text-decoration-none fs-4 text-dark">
                MERN E-Commerce
              </Link>
            </div>
            <form className="search-bar" onSubmit={submitHandler}>
              <FaSearch />
              <input
                type="text"
                name=""
                id=""
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search product here"
                className="p-2 border border-0 nav-input"
              />
            </form>
            <div className="right">
              {isAuthenticated && (
                <>
                  <Link
                    to={"/cart"}
                    className="px-4 py-1 nav-btn-text-size mx-2 position-relative"
                  >
                    {cart?.items?.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle px-2 py-0 rounded-3 bg-info">
                        {cart?.items?.length}
                      </span>
                    )}
                    <FaShoppingCart /> Cart
                  </Link>
                  <Link
                    to={"/profile"}
                    className="px-3 py-1 nav-btn-text-size mx-2"
                  >
                    <FaUserAlt /> Profile
                  </Link>
                  <button
                    className="px-3 py-1 nav-btn-text-size mx-2"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    <RiLogoutBoxFill /> Logout
                  </button>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <Link
                    to={"/login"}
                    className="px-3 py-1 nav-btn-text-size mx-2"
                  >
                    <RiLoginBoxFill /> Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="px-3 py-1 nav-btn-text-size mx-2"
                  >
                    <FaUserPlus /> Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        {location.pathname == "/" && (
          <div className="container-fluid sub-bar nav sticky-top px-lg-4 px-2">
            <div className=" d-flex w-100 py-3">
              <div
                className="sub-bar-items me-2 fs-5"
                onClick={() => setFilteredData(products)}
              >
                <p className="m-0">No filter</p>
              </div>
              <div
                className="sub-bar-items mx-2 fs-5"
                onClick={() => filterByCategory("mobile", "")}
              >
                <p className="m-0">Mobiles</p>
              </div>
              <div
                className="sub-bar-items mx-2 fs-5"
                onClick={() => filterByCategory("laptop", "")}
              >
                <p className="m-0">Laptops</p>
              </div>
              <div
                className="sub-bar-items mx-2 fs-5"
                onClick={() => filterByCategory("camera", "")}
              >
                <p className="m-0">Camera</p>
              </div>
              <div
                className="sub-bar-items mx-2 fs-5"
                onClick={() => filterByCategory("headphone", "")}
              >
                <p className="m-0">Headphones</p>
              </div>
              <div
                className="sub-bar-items mx-2 fs-5"
                onClick={() => filterByCategory("", 20000)}
              >
                <p className="m-0">&lt;20000</p>
              </div>
              <div
                className="sub-bar-items mx-2 fs-5"
                onClick={() => filterByCategory("", 40000)}
              >
                <p className="m-0">&lt;40000</p>
              </div>
              <div
                className="sub-bar-items mx-2 fs-5"
                onClick={() => filterByCategory("", 60000)}
              >
                <p className="m-0">&lt;60000</p>
              </div>
              <div
                className="sub-bar-items mx-2 fs-5"
                onClick={() => filterByCategory("", 80000)}
              >
                <p className="m-0">&lt;80000</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
