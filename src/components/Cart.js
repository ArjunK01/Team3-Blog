import React, { useContext } from "react";
import "../styles/cart.css";
import productImage from "../images/product.jpg";
import image from "../images/shirt.jpeg";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";

const Product = ({ title, price, stock, description, isEdit }) => {
  return (
    <div className="product-card">
      <div className="product-content">
        <div className="product-image">
          <img>src={productImage}</img>
          <img style={{ height: "100px", width: "100px" }} src={image} />
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
          {isEdit && (
            <div
              className="delete-product-btn"
              onClick={() => {
                alert("some action");
                // add product to cart BY PRODUCT ID
              }}
            >
              <DeleteIcon />
            </div>
          )}
        </div>
      </div>
      <Button>Checkout</Button>
    </div>
  );
};

export default Product;
