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
    merch.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    getMerch();
  }, []);

  const SORT_MAP = {
    Name: (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0),
    Rating: (a, b) => (a.rating > b.rating ? -1 : b.rating > a.rating ? 1 : 0),
    Price: (a, b) =>
      a.price_level > b.price_level
        ? 1
        : b.price_level > a.price_level
        ? -1
        : 0,
  };
  const SORT_NAMES = Object.keys(SORT_MAP);

  // const [viewToggle, setViewToggle] = useState(0);
  // All Products = 0
  // Most Popular = 1
  // Apparel = 2
  // Accessories = 3

  const [filterToggle, setFilterToggle] = useState(true);
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

  // fields to be inputted into the axios create request
  const [newTitle, setNewTitle] = useState("");
  const [newStock, setNewStock] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  // const [newIsVisible, setNewIsVisible] = useState(true);
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

  // force a refresh
  const refresh = () => {
    window.location.reload(false);
    // getMerch();
  };

  const [isEdit, setIsEdit] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

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
              {/* <Button
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
              </Button> */}
              <Button
                style={{
                  boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
                  marginRight: "0.5rem",
                  background: !filterToggle ? "var(--dark-blue)" : "",
                  color: !filterToggle ? "white" : "black",
                }}
                onClick={() => {
                  setFilterToggle(!filterToggle);
                }}
              >
                {filterToggle ? "Filter in stock" : "Show all"}
              </Button>

              {/* {filterToggle && (
                <div className="sort-select">
                  <select style={{ padding: "5px", textAlign: "center" }}>
                    <option selected="selected">All Items</option>
                    <option>Hats</option>
                  </select>
                </div>
              )} */}

              <Button
                style={{ boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)" }}
                onClick={() => {
                  setSortToggle(!sortToggle);
                }}
              >
                Sort price
              </Button>
              {/* {sortToggle && (
                <div className="sort-select">
                  <select style={{ padding: "5px" }}>
                    <option selected="selected">Best Selling</option>
                    <option>Alphabetically, A-Z</option>
                    <option>Alphabetically, Z-A</option>
                    <option>Price (low to high)</option>
                    <option>Price (high to low)</option>
                  </select>
                </div>
              )} */}
            </div>
            {user && user.isAdmin && (
              <div className="admin-edit-buttons-container">
                <Button
                  style={{
                    // backgroundColor: "#ff8b8b",
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
                {/* <FormControlLabel
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
                /> */}
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
                    setTimeout(() => handleClose(), 200);
                    // handleClose();
                  }}
                  color="primary"
                  // style={{ background: "#6fbd6f" }}
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
          <div className="cart-confirmation-container">
            <h2
              style={{
                color: "#6fbd6f",
                display: addedToCart ? "flex" : "none",
                justifyContent: "center",
                transition: "ease-in-out",
              }}
            >
              Added to cart!
            </h2>
          </div>
        </div>
        {/* {isEdit && (
          <p
            style={{ color: "red", display: "flex", justifyContent: "center" }}
          >
            Editing...
          </p>
        )} */}
        <div className="shop-products-container">
          {/* map through merch products from database */}
          {merch &&
            merch.map((m, i = 1) => {
              if (!filterToggle && m.stock >= 1) {
                return (
                  <Product
                    title={m.title}
                    price={m.price}
                    stock={m.stock}
                    images={m.images}
                    description={m.description}
                    isEdit={isEdit}
                    productID={m.id}
                    setAddedToCart={setAddedToCart}
                  />
                );
              } else if (filterToggle) {
                return (
                  <Product
                    title={m.title}
                    price={m.price}
                    stock={m.stock}
                    images={m.images}
                    description={m.description}
                    isEdit={isEdit}
                    productID={m.id}
                    setAddedToCart={setAddedToCart}
                  />
                );
              }
              // return (
              //   <Product
              //     title={m.title}
              //     price={m.price}
              //     stock={m.stock}
              //     images={m.images}
              //     description={m.description}
              //     isEdit={isEdit}
              //     productID={m.id}
              //   />
              // );
            })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
