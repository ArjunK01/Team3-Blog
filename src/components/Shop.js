import React, { useState } from "react";
import "../styles/shop.css";
import { Button } from "@material-ui/core";
import Product from "./Product";

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
              style={{ background: "var(--light-gray)", marginRight: "1rem" }}
              onClick={() => {
                setBoth();
              }}
            >
              Toggle All
            </Button>
            <Button
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
          {/* <div className="conditional-filter-sort">
            {filterToggle && (
              <div className="sort-select">
                <select style={{ padding: "5px", textAlign: "center" }}>
                  <option selected="selected">All Items</option>
                  <option>Hats</option>
                </select>
              </div>
            )}
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
          </div> */}
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
