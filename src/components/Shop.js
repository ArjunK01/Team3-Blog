import React, { useState, useContext } from "react";
import "../styles/shop.css";
import { Button, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Product from "./Product";
import { AuthContext } from "../context/AuthProvider";

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
  // Add Dialoge
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // ___________
  const { user } = useContext(AuthContext);
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
          {/* {user && ( */}
          {user && (
            <div className="admin-edit-buttons-container">
              <Button
                style={{
                  background: "#ff8b8b",
                  color: "white",
                  marginRight: "1rem",
                  boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
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
                Fill in below product details.
              </DialogContentText>
              <TextField
                // autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                required="true"
                // fullWidth
              />
              <TextField
                // autoFocus
                margin="dense"
                id="price"
                label="Price"
                placeholder="$00.00"
                type="number"
                required="true"
                // fullWidth
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
                  alert("some action");
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
          <p className="product-count">__ total products</p>
        </div>
        <div className="products-container">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </div>
  );
};

export default Shop;
