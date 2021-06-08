import React from "react";
import "../styles/shop.css";
import LocalMallIcon from "@material-ui/icons/LocalMall";

const Product = () => {
  return (
    <div className="product-card">
      <div className="product-content">
        <div className="product-image">
          <LocalMallIcon style={{ fontSize: "8rem" }} />
        </div>
        <div className="product-information">
          <p className="product-name reset-padding">Product</p>
          <p className="product-price reset-padding">$30</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
