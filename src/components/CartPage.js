import React, { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import image from "../images/shirt.jpeg";

const CartPage = () => {
  const { cart } = useContext(CartContext);
  return (
    <div>
      {cart &&
        cart.map(item => {
          return (
            <p>
              {item.title} - {item.price} - {item.stock} - {item.description}
              <img style={{ height: "100px", width: "100px" }} src={image} />
            </p>
          );
        })}
    </div>
  );
};

export default CartPage;
