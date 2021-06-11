import React, { useState, useContext, useEffect } from "react";
import "../styles/shop.css";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import CreateIcon from "@material-ui/icons/Create";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { Button, TextField, FormControlLabel } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ApiContext } from "../context/ApiProvider";
import { CartContext } from "../context/CartProvider";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const Product = ({
  title,
  price,
  stock,
  images,
  description,
  isEdit,
  productID,
  setAddedToCart,
}) => {
  const { getMerch } = useContext(ApiContext);

  const [open, setOpen] = useState(false);

  const [newTitle, setNewTitle] = useState(title);
  const [newStock, setNewStock] = useState(stock);
  const [newPrice, setNewPrice] = useState(price);
  const [newImages, setNewImages] = useState(images);
  const [newDescription, setNewDescription] = useState(description);

  // handle dialog open
  const handleClickOpen = () => {
    setOpen(true);
  };

  // handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  const saveAnimation = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 900);
  };

  const deleteAnimation = () => {
    setDeleted(true);
    setTimeout(() => setDeleted(false), 200);
  };

  const cartAnimation = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 900);
  };

  const deleteProduct = () => {
    axios({
      method: "delete",
      url: "http://localhost:8000/merch/delete",
      data: {
        merch_id: productID,
      },
    });
    setTimeout(() => getMerch(), 300);
  };
  const updateProduct = async () => {
    await axios({
      method: "put",
      url: "http://localhost:8000/merch/edit/",
      data: {
        merch_id: productID,
        title: newTitle,
        stock: newStock,
        price: newPrice,
        isVisible: true,
        images: newImages,
        description: newDescription,
      },
    });
    setTimeout(() => {
      getMerch();
    }, 200);
  };

  const [saved, setSaved] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const { addItem } = useContext(CartContext);
  return (
    <div
      className="shop-product-card"
      style={{
        backgroundColor:
          saved || deleted
            ? saved
              ? "rgb(111, 189, 111, 0.44)"
              : "rgb(255, 139, 139, 0.44)"
            : "var(--light-gray)",
        transition: "all 0.5s ease",
      }}
    >
      <div className="product-content">
        <div className="topSection">
          <div className="product-image">
            {images.length >= 5 ? (
              <img src={images} className="product-img-tag" />
            ) : (
              <LocalMallIcon style={{ fontSize: "7rem", color: "grey" }} />
            )}
            {/* {console.log({ images })} */}
          </div>
          <div className="product-information">
            {/* TITLE */}
            {/* {title.length <= 0 ? ( */}
            <p className="product-name reset-padding">{title}</p>
            {/* ) : (
            <p
              className="product-name reset-padding"
              style={{ fontStyle: "italic", color: "grey" }}
            >
              empty title
            </p>
          )} */}
            {/* PRICE */}
            <p className="product-price reset-padding">${price}</p>
            {/* DESCRIPTION */}
            <p className="product-desc reset-padding" style={{ color: "grey" }}>
              {description}
            </p>
            {/* STOCK AVAILABLE */}
            <div className="stock-container">
              <p className="product-stock reset-padding">
                {stock <= 0 ? (
                  <div style={{ color: "red" }}>
                    {/* <strong style={{ color: "red" }}>Out of stock</strong> */}
                    Out of stock
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
        </div>
      </div>
      <div className="bottomSection">
        <div className="bottom-actions">
          {!isEdit &&
            (stock >= 1 ? (
              <div
                className="add-to-cart-btn"
                onClick={() => {
                  // add product to cart BY PRODUCT ID
                  addItem(title, description, price, stock, images, productID);
                  setAddedToCart(cartAnimation);
                }}
              >
                <AddShoppingCartIcon />
              </div>
            ) : (
              // <RemoveShoppingCartIcon style={{ color: "grey" }} />
              <p style={{ color: "grey", padding: "0", margin: "0" }}>
                Unavailable
              </p>
            ))}

          {isEdit && (
            <div
              className="edit-btns"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div
                className="delete-product-btn"
                onClick={() => {
                  // delete product BY PRODUCT ID
                  deleteAnimation();
                  deleteProduct();
                }}
              >
                <DeleteIcon />
              </div>
              <div
                className="add-to-cart-btn"
                onClick={() => {
                  // edit product BY PRODUCT ID
                  handleClickOpen();
                }}
              >
                <CreateIcon />
              </div>
            </div>
          )}
          <div className="product-edit-dialog">
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
              <DialogContent
                style={{ display: "flex", flexDirection: "column" }}
              >
                <DialogContentText>Product ID: {productID}</DialogContentText>
                {/* INPUT -- PRODUCT TITLE/NAME */}
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Title"
                  type="text"
                  value={newTitle}
                  // placeholder={title}
                  fullWidth
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                />
                {/* INPUT -- STOCK AVAILABLE */}
                <TextField
                  // autoFocus
                  margin="dense"
                  id="stock"
                  label="Stock available"
                  type="number"
                  value={newStock}
                  // placeholder={stock}
                  fullWidth
                  onChange={(e) => {
                    setNewStock(e.target.value);
                  }}
                />
                {/* INPUT -- PRICE */}
                <TextField
                  // autoFocus
                  margin="dense"
                  id="price"
                  label="Price"
                  value={newPrice}
                  // placeholder={price}
                  type="number"
                  fullWidth
                  onChange={(e) => {
                    setNewPrice(e.target.value);
                  }}
                />
                {/* INPUT -- IMAGES */}
                <TextField
                  // autoFocus
                  margin="dense"
                  id="images"
                  label="Image URL"
                  value={newImages}
                  // placeholder={images}
                  type="text"
                  fullWidth
                  onChange={(e) => {
                    setNewImages(e.target.value);
                  }}
                />
                {/* INPUT -- DESCRIPTION */}
                <TextField
                  // autoFocus
                  margin="dense"
                  id="desc"
                  label="Description"
                  value={newDescription}
                  // placeholder={description}
                  type="text"
                  fullWidth
                  onChange={(e) => {
                    setNewDescription(e.target.value);
                  }}
                />
              </DialogContent>
              <DialogActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  onClick={handleClose}
                  color="primary"
                  // style={{ background: "#ff8b8b" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // call createProduct() to database via axios
                    updateProduct();
                    // refresh();
                    setTimeout(() => handleClose(), 200);
                    saveAnimation();

                    // handleClose();
                  }}
                  color="primary"
                  // style={{ background: "#6fbd6f" }}
                >
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
