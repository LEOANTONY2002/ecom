import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShippingAddress } from "../actions/shippingAction";
import "./Payment.css";
import cod from "./images/cod.png";
import ppl from "./images/pay.png";
import { useHistory } from "react-router-dom";
import { createOrder } from "../actions/orderAction";

function Payment({ user, cart, total }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, ship, fail } = useSelector((state) => state.ship);

  useEffect(() => {
    dispatch(getShippingAddress(user.email));

    if (fail) history.push("/shipping");
  }, [user]);

  const order = async (method) => {
    await dispatch(
      createOrder({
        username: user.name,
        email: user.email,
        products: cart,
        payment: "Cash on Delivery",
      })
    );
    if (method === "cod") history.push("/orders");
    if (method === "ppl") history.push("/paypal");
  };

  return (
    <div className="payment">
      <div className="address">
        <div className="ad-head">
          <p></p>
          <h2>SHIPPING ADDRESS</h2>
          <p></p>
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
        <div className="ad-body">
          <p>{ship?.name}</p>
          <p>{ship?.address}</p>
          <p>{ship?.city}</p>
          <p>{ship?.state}</p>
          <p>{ship?.country}</p>
          <p>{ship?.zip}</p>
          <p>{ship?.email}</p>
          <p>{ship?.phone}</p>
          <button onClick={() => (window.location.href = "/shipping")}>
            EDIT
          </button>
        </div>
      </div>
      <div className="prods">
        <div className="ad-head">
          <p></p>
          <h2>SHIPPING PRODUCTS</h2>
          <p></p>
        </div>
        <div className="b-flex">
          <div className="pr-body">
            {cart &&
              cart.map((p) => (
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
                          <p>₹{p?.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="pay">
          <div className="ad-head">
            <p></p>
            <h2>PAYMENT METHODS</h2>
            <p></p>
          </div>
          <div className="pay-body">
            <div onClick={() => order("cod")} className="pay-field">
              <img src={cod} alt="cahOnDelivery" />
              <p>Cash on Delivery</p>
            </div>
            <div onClick={() => history.push("/paypal")} className="pay-field">
              <img src={ppl} alt="paypal" />
              <p>Paypal</p>
            </div>
          </div>
          <p>
            <span>₹{total}</span>
            <span></span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
