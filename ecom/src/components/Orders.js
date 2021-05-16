import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../actions/orderAction";
import "./Orders.css";

function Orders({ user }) {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => state.orders);
  console.log(user);

  useEffect(() => {
    const fetch = async () => {
      dispatch(getOrders(user.email));
    };
    fetch();
    console.log("orders...", orders);
  }, []);

  return (
    <div className="orders">
      <div className="heading">
        <p>ORDERS</p>
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
      {orders &&
        orders?.map((o) => (
          <div key={o?._id} className="order">
            <div className="o-head">
              <p>order</p>
              <span>{o?._id}</span>
            </div>
            <div className="o-body">
              {o?.products.map((p) => (
                <div key={p?._id} className="o-product">
                  <img src={p?.image} alt={p?.name} />
                  <div className="op-desc">
                    <h3>{p?.name}</h3>
                    <p>₹{p?.price}</p>
                    <span>
                      Qty :<p>{p?.qty}</p>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="o-foot">
              <p>Created At </p>
              <span>{o?.createdAt}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Orders;
