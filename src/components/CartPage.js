import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartProvider";
import { AuthContext } from "../context/AuthProvider";
import image from "../images/shirt.jpeg";
import "../styles/cart.css";
import CartItem from "./CartItem";
import axios from "axios";

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [cc, setCC] = useState("");

  const checkout = async () => {
    if (cart.length === 0) return;
    let merch = [];
    cart.forEach(item => {
      merch.push({ merch_id: item.id, quantity: 1 });
    });
    await axios({
      method: "put",
      url: "http://localhost:8000/merch/purchase",
      headers: {},
      data: {
        user_id: user.id,
        merch
      }
    });
    setCart([]);
  };

  useEffect(() => {
    setTotal(0);
    cart.forEach(item => setTotal(t => t + parseFloat(item.price)));
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
          {user && (
            <div className="checkoutBtn" onClick={() => checkout()}>
              Checkout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
