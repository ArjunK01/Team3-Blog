import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/shop.css";
import { Button, TextField, FormControlLabel } from "@material-ui/core";
import Product from "./Product";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import { AuthContext } from "../context/AuthProvider";
import { ApiContext } from "../context/ApiProvider";

const Shop = () => {
  const { user } = useContext(AuthContext);
  const { merch, getMerch } = useContext(ApiContext);
  useEffect(() => {
    merch.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else {
        return -1;
      }
    });
  }, []);

  const [viewToggle, setViewToggle] = useState(0);

  const [filterToggle, setFilterToggle] = useState(false);
  const [sortToggle, setSortToggle] = useState(false);
  const setBoth = () => {
    if (filterToggle || sortToggle) {
      setFilterToggle(false);
      setSortToggle(false);
    } else {
      setFilterToggle(true);
      setSortToggle(true);
    }
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [newTitle, setNewTitle] = useState("");
  const [newStock, setNewStock] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newImages, setNewImages] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const createProduct = () => {
    axios({
      method: "post",
      url: "http://localhost:8000/merch/create",
      data: {
        title: newTitle,
        stock: newStock,
        price: newPrice,
        isVisible: true,
        images: newImages,
        description: newDescription,
      },
    });
    setTimeout(() => getMerch(), 200);
  };

  const refresh = () => {
    window.location.reload(false);
  };

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <div className="shop-page-title">Shop</div>
      <div className="shop-container">
        <div className="shop-header">
          <div className="header-tab-selection">
            <Button style={{ fontSize: "1.3rem" }}>All Products</Button>
            <Button style={{ fontSize: "1.3rem" }}>Most Popular</Button>
            <Button style={{ fontSize: "1.3rem" }}>Apparel</Button>
            <Button style={{ fontSize: "1.3rem" }}>Accessories</Button>
          </div>
          <hr
            style={{
              height: "3px",
              backgroundColor: isEdit ? "red" : "black",
              transition: "all 0.25s ease",
            }}
          />
          <div className="shop-header-filter-sort">
            <div className="shop-subheader-filter-btns">
              {}
              <Button
                style={{
                  boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
                  marginRight: "0.5rem",
                }}
                onClick={() => {
                  setFilterToggle(!filterToggle);
                }}
              >
                Filter in stock
              </Button>

              {}

              <Button
                style={{ boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)" }}
                onClick={() => {
                  setSortToggle(!sortToggle);
                }}
              >
                Sort price
              </Button>
              {}
            </div>
            {user && (
              <div className="admin-edit-buttons-container">
                <Button
                  style={{
                    backgroundColor: !isEdit ? "#ff8b8b" : "white",
                    color: !isEdit ? "white" : "black",
                    border: !isEdit ? "none" : "1px solid red",
                    marginRight: "1rem",
                    boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={handleClickOpen}
                  style={{
                    background: "#6fbd6f",
                    color: "white",
                    boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Add
                </Button>
              </div>
            )}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">New Product</DialogTitle>
              <DialogContent
                style={{ display: "flex", flexDirection: "column" }}
              >
                <DialogContentText>
                  Fill in below product details to create a new product.
                </DialogContentText>
                {}
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Title"
                  type="text"
                  placeholder="Ex. T-Shirt"
                  required="true"
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
                  placeholder="Ex. 15"
                  required="number"
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
                  placeholder="Ex. $xx.xx"
                  type="number"
                  required="true"
                  fullWidth
                  onChange={(e) => {
                    setNewPrice(e.target.value);
                  }}
                />
                {}
                {}
                {}
                <TextField
                  margin="dense"
                  id="images"
                  label="Image URL"
                  placeholder="Ex. http://...."
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
                  placeholder="Ex. 100% cotton"
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
                    createProduct();
                    setTimeout(() => handleClose(), 200);
                  }}
                  color="primary"
                >
                  Create
                </Button>
              </DialogActions>
            </Dialog>
            {merch.length === 1 ? (
              <p className="product-count">{merch.length} product available</p>
            ) : (
              <p className="product-count">{merch.length} products available</p>
            )}
          </div>
        </div>
        {}
        <div className="shop-products-container">
          {}
          {merch &&
            merch.map((m) => {
              return (
                <Product
                  title={m.title}
                  price={m.price}
                  stock={m.stock}
                  images={m.images}
                  description={m.description}
                  isEdit={isEdit}
                  productID={m.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
