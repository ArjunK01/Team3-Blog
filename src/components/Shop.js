import React, { useState } from "react";
import "../styles/shop.css";
import { Button } from "@material-ui/core";
import Product from "./Product";

const Shop = () => {
  const [filterToggle, setFilterToggle] = useState(false);
  const [sortToggle, setSortToggle] = useState(true);
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
            <Button>Filter</Button>
            <Button
              onClick={() => {
                setSortToggle(!sortToggle);
              }}
            >
              Sort
            </Button>
          </div>
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
