import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";

function ProductDetail() {
  const { products, filteredData, addToCart } = useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const url = "http://localhost:3000/api";
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="container py-5" style={{ backgroundColor: "#ffffff" }}>
        <div className="row">
          <div className="col-lg-6 col-12 d-flex justify-content-center">
            <img src={product?.imgSrc} alt="" className="single-product-img" />
          </div>
          <div className="col-lg-6 col-12 py-5 px-3 d-flex flex-column justify-content-evenly">
            <h2 className="fw-light text-secondary">{product?.category}</h2>
            <h1 className="fw-light">{product?.title}</h1>
            <h1 className="fw-light">₹{product?.price}</h1>
            <p className="fw-light fs-4">{product?.description}</p>
            <div>
              <button className="btn btn-primary">Buy Now</button>
              <button
                className="ms-3 btn btn-success"
                onClick={() =>
                  addToCart(
                    product._id,
                    product.title,
                    product.price,
                    1,
                    product.imgSrc
                  )
                }
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RelatedProducts */}
      <RelatedProduct category={product?.category} />
    </>
  );
}

export default ProductDetail;
