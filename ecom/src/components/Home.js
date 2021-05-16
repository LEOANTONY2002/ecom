import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getByCategory, productList } from "../actions/productAction";
import "./Home.css";
import grt from "./images/grt.png";
import less from "./images/less.png";

function Home() {
  const { loading, products } = useSelector((state) => state.productList);
  const { catload, catprods } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [leftOpen, setLeftOpen] = useState(false);
  const [cat, setCategory] = useState();
  console.log(catprods);

  useEffect(() => {
    dispatch(productList());
    console.log(products);
  }, []);

  const leftHandler = () => {
    if (leftOpen) setLeftOpen(false);
    else setLeftOpen(true);
  };

  const category = async (cat) => {
    dispatch(getByCategory(cat));
  };

  return (
    <div className="home">
      <div className={leftOpen ? "left lol" : "left"}>
        <div className="l-cont">
          {leftOpen && <h2>CATEGORIES</h2>}
          <div
            onClick={() => {
              category("accessories");
              setCategory("Tech Accessories");
              setLeftOpen(false);
            }}
            className="l-field"
          >
            <i class="fas fa-microchip"></i>
            <p>Tech Accessories</p>
          </div>
          <div
            onClick={() => {
              category("food");
              setCategory("Food & Groceries");
              setLeftOpen(false);
            }}
            className="l-field"
          >
            <i class="fas fa-utensils"></i>
            <p>Food & Groceries</p>
          </div>
          <div
            onClick={() => {
              category("electricals");
              setCategory("Electricals & Home Appliances");
              setLeftOpen(false);
            }}
            className="l-field"
          >
            <i class="fas fa-house-damage"></i>
            <p>Electricals & Home Appliances</p>
          </div>
          <div
            onClick={() => {
              category("art");
              setCategory("Arts");
              setLeftOpen(false);
            }}
            className="l-field"
          >
            <i class="fas fa-paint-brush"></i>
            <p>Arts</p>
          </div>
          <div
            onClick={() => {
              category("book");
              setCategory("Books");
              setLeftOpen(false);
            }}
            className="l-field"
          >
            <i class="fas fa-book"></i>
            <p>Books</p>
          </div>
          <div
            onClick={() => {
              category("fashion");
              setCategory("Fashion");
              setLeftOpen(false);
            }}
            className="l-field"
          >
            <i class="fas fa-user-secret"></i>
            <p>Fashion</p>
          </div>
          <div
            onClick={() => {
              category("toy");
              setCategory("Toys & Entertainment");
              setLeftOpen(false);
            }}
            className="l-field"
          >
            <i class="fas fa-gamepad"></i>
            <p>Toys & Entertainment</p>
          </div>
          <div
            onClick={() => {
              category("other");
              setCategory("Others");
              setLeftOpen(false);
            }}
            className="l-field"
          >
            <i class="fas fa-ellipsis-v"></i>
            <p>Others</p>
          </div>
        </div>
        <img onClick={leftHandler} src={leftOpen ? less : grt} alt="" />
      </div>
      {loading && (
        <div className="loading">
          <div>
            <p>.</p>
            <p>.</p>
            <p>.</p>
          </div>
        </div>
      )}
      {catload && (
        <div className="loading">
          <div>
            <p>.</p>
            <p>.</p>
            <p>.</p>
          </div>
        </div>
      )}
      {products && (
        <div className="h-products">
          {products?.map((p) => (
            <Link key={p?._id} to={`product/details/${p._id}`}>
              <div key={p?._id} className="h-product">
                <div className="hp-img">
                  <img src={p?.image} alt={p?.name} />
                </div>
                <div className="hp-desc">
                  <p>{p?.name}</p>
                  <p>₹{p?.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {catprods === [] && (
        <div className="no-prods">
          <p>No Products Available</p>
        </div>
      )}
      {catprods !== [] && (
        <>
          <div className="heading">
            {cat && <p className="ex-pad">{cat}</p>}
          </div>
          <div className="h-products">
            {catprods?.map((p) => (
              <Link key={p?._id} to={`product/details/${p._id}`}>
                <div key={p?._id} className="h-product">
                  <div className="hp-img">
                    <img src={p?.image} alt={p?.name} />
                  </div>
                  <div className="hp-desc">
                    <p>{p?.name}</p>
                    <p>₹{p?.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
