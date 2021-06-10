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
  // Add Product Dialoge
  const [open, setOpen] = useState(false);

  // handle dialog open
  const handleClickOpen = () => {
    setOpen(true);
  };

  // handle dialog close
  const handleClose = () => {
    setOpen(false);
  };
  // ___________
  const { user } = useContext(AuthContext);
  const { merch, getMerch } = useContext(ApiContext);

  // fields to be inputted into the axios create request
  const [newTitle, setNewTitle] = useState("");
  const [newStock, setNewStock] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newIsVisible, setNewIsVisible] = useState(true);
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
        isVisible: newIsVisible,
        images: newImages,
        description: newDescription,
      },
    });
  };

  // force a refresh
  const refresh = () => {
    // window.location.reload(false);
    getMerch();
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
          <hr />
          <div className="header-filter-sort">
            <Button
              style={{
                background: "var(--light-gray)",
                marginRight: "1rem",
                boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {
                setBoth();
              }}
            >
              Toggle All
            </Button>
            <Button
              style={{
                boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
                marginRight: "0.5rem",
              }}
              onClick={() => {
                setFilterToggle(!filterToggle);
              }}
            >
              Filter
            </Button>

            {filterToggle && (
              <div className="sort-select">
                <select style={{ padding: "5px", textAlign: "center" }}>
                  <option selected="selected">All Items</option>
                  <option>Hats</option>
                </select>
              </div>
            )}

            <Button
              style={{ boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)" }}
              onClick={() => {
                setSortToggle(!sortToggle);
              }}
            >
              Sort
            </Button>
            {sortToggle && (
              <div className="sort-select">
                <select style={{ padding: "5px" }}>
                  <option selected="selected">Best Selling</option>
                  <option>Alphabetically, A-Z</option>
                  <option>Alphabetically, Z-A</option>
                  <option>Price (low to high)</option>
                  <option>Price (high to low)</option>
                </select>
              </div>
            )}
          </div>
          {user && (
            <div className="admin-edit-buttons-container">
              <Button
                style={{
                  background: "#ff8b8b",
                  color: "white",
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
            <DialogContent style={{ display: "flex", flexDirection: "column" }}>
              <DialogContentText>
                Fill in below product details to create a new product.
              </DialogContentText>
              {/* INPUT -- PRODUCT TITLE/NAME */}
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
              {/* INPUT -- STOCK AVAILABLE */}
              <TextField
                // autoFocus
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
              {/* INPUT -- PRICE */}
              <TextField
                // autoFocus
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
              {/* INPUT -- IS_VISIBLE */}
              <FormControlLabel
                margin="dense"
                control={
                  <Checkbox
                    checked={newIsVisible}
                    name="checkbox"
                    color="primary"
                    onChange={(e) => {
                      setNewIsVisible(e.target.checked);
                    }}
                  />
                }
                label="Show in store?"
              />
              {/* INPUT -- IMAGES */}
              <TextField
                // autoFocus
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
              {/* INPUT -- DESCRIPTION */}
              <TextField
                // autoFocus
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
                // style={{ background: "#ff8b8b" }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // call createProduct() to database via axios
                  createProduct();
                  // refresh();
                  handleClose();
                }}
                color="primary"
                // style={{ background: "#6fbd6f" }}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
          {/* </div> */}
          {/* )} */}
          <p className="product-count">{merch.length} total products</p>
        </div>
        <div className="products-container">
          {/* map through merch products from database */}
          {merch &&
            merch.map((m) => {
              // console.log(m.title, m.price, m.stock, m.description);
              return (
                <Product
                  title={m.title}
                  price={m.price}
                  stock={m.stock}
                  description={m.description}
                  isEdit={isEdit}
                />
              );
            })}
          {/* <Product /> */}
          {/* <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product /> */}
        </div>
      </div>
    </div>
  );
};

export default Shop;
