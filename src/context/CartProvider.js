import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import axios from "axios";
import Loading from "../components/Loading";
import { assertJSXClosingElement } from "@babel/types";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (title, description, price, stock, images, id) => {
    let temp = [...cart];
    temp.push({ title, description, stock, price, images, id });
    setCart(temp);
  };

  const deleteItem = id => {
    let temp = [...cart];
    temp = temp.filter(item => item.id !== id);
    setCart(temp);
  };

  useEffect(() => {
    let temp = [
      {
        price: 40,
        id: 1,
        stock: 50,
        title: "Shirt",
        description: "Description",
        images:
          "https://www.google.com/search?q=shirt+image&rlz=1C5CHFA_enUS858US858&tbm=isch&source=iu&ictx=1&fir=1YzAqjqhWNZ2UM%252Cto-uwN9NqyFtIM%252C_&vet=1&usg=AI4_-kT0Q4K4B9Jt3y3_IvvmFgvll5n0kg&sa=X&ved=2ahUKEwjsyc6-_Y3xAhUDElkFHSsPDccQ9QF6BAgOEAE#imgrc=1YzAqjqhWNZ2UM"
      },
      {
        price: 43,
        stock: 100,
        id: 2,
        title: "new shirt",
        description: "Description",
        images:
          "https://www.google.com/search?q=shirt+image&rlz=1C5CHFA_enUS858US858&tbm=isch&source=iu&ictx=1&fir=1YzAqjqhWNZ2UM%252Cto-uwN9NqyFtIM%252C_&vet=1&usg=AI4_-kT0Q4K4B9Jt3y3_IvvmFgvll5n0kg&sa=X&ved=2ahUKEwjsyc6-_Y3xAhUDElkFHSsPDccQ9QF6BAgOEAE#imgrc=1YzAqjqhWNZ2UM"
      },
      {
        price: 2,
        id: 3,
        stock: 1000,
        title: "Gucci Shirt",
        description: "Description",
        images:
          "https://www.google.com/search?q=shirt+image&rlz=1C5CHFA_enUS858US858&tbm=isch&source=iu&ictx=1&fir=1YzAqjqhWNZ2UM%252Cto-uwN9NqyFtIM%252C_&vet=1&usg=AI4_-kT0Q4K4B9Jt3y3_IvvmFgvll5n0kg&sa=X&ved=2ahUKEwjsyc6-_Y3xAhUDElkFHSsPDccQ9QF6BAgOEAE#imgrc=1YzAqjqhWNZ2UM"
      }
    ];
    setCart(temp);
  }, []);
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        deleteItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export { CartContext };
