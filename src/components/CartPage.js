import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartProvider";
import image from "../images/shirt.jpeg";
import "../styles/cart.css";
import CartItem from "./CartItem";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [cc, setCC] = useState("");

  useEffect(() => {
    setTotal(0);
    cart.forEach(item => setTotal(t => t + parseInt(item.price)));
  }, [cart]);
  return (
    <div className="cart">
      <div className="cartHeader">Cart</div>
      <div className="cartPageContainer">
        <div className="cartList">
          {cart &&
            cart.map((item, i) => {
              return <CartItem setTotal={setTotal} item={item} key={i} />;
            })}
        </div>
        <div className="sidebar">
          <div
            className="checkoutHeader"
            style={{ display: "flex", alignItems: "center" }}
          >
            Checkout
          </div>
          <div className="checkoutTotal">Total: ${total}</div>
          <input
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            type="text"
            class="form-control authInput mb-2"
          />
          <input
            placeholder="Credit Card"
            value={cc}
            onChange={e => setCC(e.target.value)}
            type="text"
            class="form-control authInput mb-2"
          />
          <div className="checkoutBtn">Checkout</div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
