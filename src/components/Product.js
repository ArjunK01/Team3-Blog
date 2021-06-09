import React from "react";
import "../styles/shop.css";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const Product = ({ title, price, stock, description }) => {
  return (
    <div className="product-card">
      <div className="product-content">
        <div className="product-image">
          <LocalMallIcon style={{ fontSize: "7rem" }} />
        </div>
        <div className="product-information">
          {/* TITLE */}
          <p className="product-name reset-padding">{title}</p>
          {/* PRICE */}
          <p className="product-price reset-padding">${price}</p>
          {/* DESCRIPTION */}
          <p className="product-desc reset-padding" style={{ color: "grey" }}>
            {description}
          </p>
          {/* STOCK AVAILABLE */}
          <div className="stock-container">
            <p className="product-stock reset-padding">
              <strong>{stock}</strong>
            </p>
            <p
              className="product-stock reset-padding"
              style={{ color: "grey" }}
            >
              &nbsp;remaining
            </p>
          </div>
        </div>
        <div className="bottom-actions">
          <div
            className="add-to-cart-btn"
            onClick={() => {
              alert("some action");
              // add product to cart BY PRODUCT ID
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
