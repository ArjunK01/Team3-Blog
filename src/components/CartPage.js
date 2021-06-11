import { CartContext } from "../context/CartProvider";
import image from "../images/shirt.jpeg";
import React, { useState, useEffect, useContext } from "react";
import "../styles/cart.css";
import Product from "./Product";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <div className="cart-page-title">Cart</div>
      <div className="cart-container">
        <div className="cart-header"></div>
        {/* Number of products in the user's cart */}
        <h4 className="product-count">
          You have {cart.length} product(s) in cart.
        </h4>
        <div className="products-container">
          {cart &&
            cart.map((item) => {
              return (
                <p>
                  <img
                    style={{ height: "100px", width: "100px" }}
                    src={image}
                  />
                  <Product
                    title={item.title}
                    price={item.price}
                    description={item.description}
                    src={image}
                  />
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
