import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

function ShorProduct() {
  const { products, filteredData, addToCart } = useContext(AppContext);
  return (
    <>
      <div className="container">
        <div className="row my-4">
          {filteredData.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-6 col-12 my-2">
              <div
                className="card mx-auto"
                style={{ width: "18rem", height: "27rem" }}
              >
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center p-3 product-img overflow-hidden"
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    style={{ width: "200px" }}
                  />
                </Link>
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <div className="d-flex justify-content-between">
                    <button href="#" className="btn btn-primary">
                      {product.price} {"₹"}
                    </button>
                    <button
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.title,
                          product.price,
                          1,
                          product.imgSrc
                        )
                      }
                      href="#"
                      className="btn btn-success"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShorProduct;
