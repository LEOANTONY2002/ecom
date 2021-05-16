import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import retn from "./images/retn.png";
import card from "./images/card.png";
import empty from "./images/empty.png";
import "./Cart.css";
import { Link } from "react-router-dom";
import { removeFromCart } from "../actions/cartAction";

function Cart({ cart, total }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="heading">
        <p>CART</p>
      </div>
      <div className="cart">
        {cart.length !== 0 && (
          <>
            <div className="bill">
              <div>
                <h3>Total :</h3> <p>₹{total}</p>
              </div>
              <Link to="/payment" className="ptc">
                <img src={card} alt="checkout" />
                <p>proceed to checkout</p>
              </Link>
            </div>
            <div className="c-body">
              {cart.map((p) => (
                <div className="cp-wrap2">
                  <div className="cp-wrap">
                    <div key={p?._id} className="c-product">
                      <img src={p?.image} alt={p?.name} />
                      <div className="cp-body">
                        <div className="cp-det">
                          <p>{p?.name}</p>
                          <p>
                            {" "}
                            Qty :<span> {p?.qty}</span>
                          </p>
                        </div>
                        <div className="cp-price">
                          <p>₹{p?.price * p?.qty}</p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          dispatch(removeFromCart(p._id));
                          window.top.location = window.top.location;
                        }}
                        className="c-remove"
                      >
                        <p>Remove</p>
                        <img src={retn} alt="remove" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {cart.length === 0 && (
          <div className="empty">
            <img src={empty} alt="empty" />
            <p>Your Cart is Empty</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
