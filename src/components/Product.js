import React, { useState, useContext } from "react";
import "../styles/shop.css";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { CartContext } from "../context/CartProvider";

const Product = ({
  title,
  price,
  stock,
  images,
  description,
  isEdit,
  productID,
  getMerch
}) => {
  const deleteProduct = () => {
    axios({
      method: "delete",
      url: "http://localhost:8000/merch/delete",
      data: {
        merch_id: productID
      }
    });
    setTimeout(() => getMerch(), 200);
  };

  const { addItem } = useContext(CartContext);
  return (
    <div className="product-card">
      <div className="product-content">
        <div className="product-image">
          {/* <LocalMallIcon style={{ fontSize: "7rem" }} /> */}
          <img src={images} className="product-img-tag" />
          {/* {console.log({ images })} */}
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
              {stock === 0 ? (
                <div>
                  <strong style={{ color: "red" }}>Out of stock</strong>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <strong>{stock}</strong>
                  <p
                    className="product-stock reset-padding"
                    style={{ color: "grey" }}
                  >
                    &nbsp;remaining
                  </p>
                </div>
              )}
            </p>
            {/* <p
              className="product-stock reset-padding"
              style={{ color: "grey" }}
            >
              &nbsp;remaining
            </p> */}
          </div>
        </div>
        <div className="bottom-actions">
          <div
            className="add-to-cart-btn"
            onClick={() => {
              // add product to cart BY PRODUCT ID
              addItem(title, description, price, stock, images, productID);
            }}
          >
            <AddShoppingCartIcon />
          </div>
          {isEdit && (
            <div
              className="delete-product-btn"
              onClick={() => {
                // delete product BY PRODUCT ID
                deleteProduct();
              }}
            >
              <DeleteIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
