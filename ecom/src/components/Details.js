import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { addToCart } from "../actions/cartAction";
import { productDetail } from "../actions/productAction";
import "./Details.css";
import cont from "./images/cont.png";
import check from "./images/check.png";
import { Link } from "react-router-dom";
import { open } from "../actions/openAction";

function Details({ id, history }) {
  const { product } = useSelector((state) => state.productDetail);
  const [stock, setStock] = useState([]);
  const [qty, setQty] = useState("1");
  const [opnMdl, setOpen] = useState(false);
  console.log(product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productDetail(id));
  }, []);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i <= product?.stock; i++) {
      arr.push(i);
    }
    setStock(arr);
  }, [product]);

  const addProduct = async (e) => {
    e.preventDefault();
    await dispatch(addToCart(id, qty));
    dispatch(open());
    setOpen(true);
  };

  return (
    <>
      {product && (
        <div key={product?._id} className="details">
          <img src={product?.image} alt={product?.name} />
          <div className="d-dets">
            <p className="d-name">{product?.name}</p>
            <p className="d-desc">{product?.desc}</p>
            <p className="d-cat">
              <span>Category : </span>
              {product?.category}
            </p>
            <p className="d-price">₹{product?.price}</p>
            {product?.stock === 0 ? (
              "Out of stock"
            ) : (
              <div>
                <div className="d-qty">
                  <p>Qty</p>
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {stock?.map((s) => (
                      <option value={s}> {s} </option>
                    ))}
                  </select>
                </div>
                <button onClick={addProduct}>ADD TO CART</button>
              </div>
            )}
          </div>
        </div>
      )}
      {opnMdl && (
        <div className="choice">
          <div>
            <p>Product has been added to the cart</p>
            <div className="ch-btns">
              <Link className="cb-con" to="/">
                <img src={cont} alt="shopping" />
                <p>Continue Shopping</p>
              </Link>
              <Link className="cb-con" to="/cart">
                <img src={check} alt="shopping" />
                <p>Go to the Cart</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
