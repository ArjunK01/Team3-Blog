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

const Product = ({
  title,
  price,
  stock,
  images,
  description,
  isEdit,
  productID,
}) => {
  const { getMerch } = useContext(ApiContext);

  const [open, setOpen] = useState(false);

  const [newTitle, setNewTitle] = useState(title);
  const [newStock, setNewStock] = useState(stock);
  const [newPrice, setNewPrice] = useState(price);
  const [newImages, setNewImages] = useState(images);
  const [newDescription, setNewDescription] = useState(description);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteProduct = () => {
    axios({
      method: "delete",
      url: "http://localhost:8000/merch/delete",
      data: {
        merch_id: productID,
      },
    });
    setTimeout(() => getMerch(), 200);
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

  const { addItem } = useContext(CartContext);
  return (
    <div className="shop-product-card">
      <div className="product-content">
        <div className="product-image">
          {images.length >= 5 ? (
            <img src={images} className="product-img-tag" />
          ) : (
            <LocalMallIcon style={{ fontSize: "7rem" }} />
          )}
          {}
        </div>
        <div className="product-information">
          {}
          <p className="product-name reset-padding">{title}</p>
          {}
          <p className="product-price reset-padding">${price}</p>
          {}
          <p className="product-desc reset-padding" style={{ color: "grey" }}>
            {description}
          </p>
          {}
          <div className="stock-container">
            <p className="product-stock reset-padding">
              {stock <= 0 ? (
                <div style={{ color: "red" }}>
                  {}
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
            {}
          </div>
        </div>
        <div className="bottom-actions">
          <div
            className="add-to-cart-btn"
            onClick={() => {
              addItem(title, description, price, stock, images, productID);
            }}
          >
            <AddShoppingCartIcon />
          </div>

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
                  deleteProduct();
                }}
              >
                <DeleteIcon />
              </div>
              <div
                className="add-to-cart-btn"
                onClick={() => {
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
                <DialogContentText>
                  Modify below details to edit this product.
                </DialogContentText>
                {}
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Title"
                  type="text"
                  fullWidth
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                />
                {}
                <TextField
                  margin="dense"
                  id="stock"
                  label="Stock available"
                  type="text"
                  value={newStock}
                  fullWidth
                  onChange={(e) => {
                    setNewStock(e.target.value);
                  }}
                />
                {}
                <TextField
                  margin="dense"
                  id="price"
                  label="Price"
                  value={newPrice}
                  type="number"
                  fullWidth
                  onChange={(e) => {
                    setNewPrice(e.target.value);
                  }}
                />
                {}
                <TextField
                  margin="dense"
                  id="images"
                  label="Image URL"
                  value={newImages}
                  type="text"
                  fullWidth
                  onChange={(e) => {
                    setNewImages(e.target.value);
                  }}
                />
                {}
                <TextField
                  margin="dense"
                  id="desc"
                  label="Description"
                  value={newDescription}
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
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    updateProduct();
                    setTimeout(() => handleClose(), 200);
                  }}
                  color="primary"
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
