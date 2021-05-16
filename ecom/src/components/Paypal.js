import React, { useEffect, useRef, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { createOrder } from "../actions/orderAction";

function Paypal({ user, cart }) {
  // const initialOptions = {
  //     "client-id": "test",
  //     currency: "USD",
  //     value: total,
  //     intent: "capture",
  //     "data-client-token": "AVvFJetQxe816S6OdlQ5cIRt8ngIURUqLGtrAYRluESw-XUM0k1M65ZYuvltmHMhgHupjEwRDs51v2EU",
  // };
  const paypalRef = useRef();
  const dispatch = useDispatch();
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const usr = await Cookies.getJSON("ecom_user");
      const crt = await Cookies.getJSON(`${usr.email}_cart`);
      let ttl = 0;
      for (let i = 0; i < crt.length; i++) {
        ttl = parseInt(crt[i].price) * parseInt(crt[i].qty) + ttl;
        console.log(ttl);
        setTotal(ttl);
      }
    };
    fetch();
    const price = total;
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "INR",
                  value: price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
          dispatch(
            createOrder({
              username: user.name,
              email: user.email,
              products: cart,
              parment: "paypal",
            })
          );
        },
        onError: (err) => {
          //   setError(err),
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, []);
  return (
    <div style={{ width: "100vw" }}>
      <div className="bill bil2">
        <div>
          <h3>Total :</h3> <p>₹{total}</p>
        </div>
      </div>
      <div ref={paypalRef}></div>
      {paid ? (
        <div>Payment successful.!</div>
      ) : (
        <div>Error Occurred in processing payment.! Please try again.</div>
      )}
    </div>
  );
}

export default Paypal;

//EH_s7AhAzqM8-x15nyV0VnOOUDnyK3__6mjj7L7oyNa0zl245mMydysV1nJRv6Ni8Rn7YT9cntyQVXoh

{
  /* <PayPalScriptProvider deferLoading={true} options={initialOptions} >
          
          <PayPalButtons style={{ layout: "horizontal" }} />
      </PayPalScriptProvider> */
}

//sb-d1dak6040209@business.example.com

//AW0soQRQZ-NINtm4jHSDxNPL5dtxjHvK6BGLTFSrFeHQKqeqqVQQ1cDNyOvGL4nRT-TGwITN8v93rJYJ

//EAeBBf4Byo9zTrzclV42Bf2cUzS9U3Mn06EcKf0s86ak7H4i9U_2G85IxLkY5HwP65zODOlj7dcA3byU
