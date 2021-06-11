import React, { useContext } from "react";
import "../styles/cart.css";
import { CartContext } from "../context/CartProvider";

const CartItem = ({ item }) => {
  const { deleteItem } = useContext(CartContext);

  return (
    <div className="cartCard">
      <div className="cartImage">
        <img src={item.images} />
      </div>
      <div className="cartInfo">
        <div className="itemTop">
          <div className="itemTitle">{item.title}</div>
          <div className="icon" onClick={() => deleteItem(item.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="itemDescrpition">{item.description}</div>
        <div className="itemPrice">${item.price}</div>
      </div>
    </div>
  );
};

export default CartItem;
