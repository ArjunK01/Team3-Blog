import React from "react";
import "../styles/shop.css";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

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
        <div className="bottom-actions">
          <div
            className="add-to-cart-btn"
            onClick={() => {
              alert("some action");
            }}
          >
            <AddShoppingCartIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
