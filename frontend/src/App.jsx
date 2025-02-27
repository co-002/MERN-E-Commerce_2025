import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ShowProduct from "./components/product/ShowProduct";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Register from "./components/user/Register";
import { ToastContainer, toast } from 'react-toastify';
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";
import OderConfirmation from "./components/OderConfirmation";


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/product/search/:term" element={<SearchProduct/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/shipping" element={<Address/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/orderConfirm" element={<OderConfirmation/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
