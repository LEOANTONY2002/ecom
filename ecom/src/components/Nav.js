import React, { useEffect, useState } from "react";
import "./Nav.css";
import logo from "./images/logo114.png";
import check from "./images/check.png";
import prof from "./images/pers.png";
import prod from "./images/prod.png";
import home from "./images/home.png";
import menu from "./images/menu.png";
import cancel from "./images/cancel.png";
import order from "./images/order.png";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

function Nav() {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const history = useHistory();
  const [count, setCount] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const usr = await Cookies.getJSON("ecom_user");
      if (usr) await setUser(usr);
      if (usr) {
        const crt = await Cookies.getJSON(`${usr.email}_cart`);
        if (crt) {
          setCart(crt);
          setCount(crt?.length);
        }
      }
    };
    fetch();
  }, []);

  const cartPage = () => {
    if (user !== []) history.push("/cart");
    else history.push("/user/login");
  };

  const menuHandler = () => {
    if (menuOpen) setMenuOpen(false);
    else setMenuOpen(true);
  };

  return (
    <>
      {menu && (
        <div
          onClick={menuHandler}
          className={menuOpen ? "menu m-open" : "menu"}
        >
          <div
            onClick={(e) => {
              window.location.href = "/";
            }}
            className="mn-field"
          >
            <img src={home} alt="" />
            <p>Home</p>
          </div>
          {user.length !== 0 ? (
            <div
              onClick={() => {
                history.push("/user/login");
              }}
              className="mn-field"
            >
              <img src={prof} alt="" />
              <p>{user?.name}</p>
            </div>
          ) : (
            <div
              onClick={() => {
                history.push("/user/login");
              }}
              className="mn-field"
            >
              <img src={prof} alt="" />
              <p>signin</p>
            </div>
          )}
          {user && (
            <div
              onClick={(e) => {
                history.push("/myproducts");
              }}
              className="mn-field"
            >
              <img src={prod} alt="" />
              <p>my products</p>
            </div>
          )}

          <div onClick={cartPage} className="mn-field">
            <img src={check} alt="" />
            <span>{count}</span>
            <p>cart</p>
          </div>
          {user && (
            <div
              onClick={(e) => {
                history.push("/orders");
              }}
              className="mn-field"
            >
              <img src={order} alt="" />
              <p>orders</p>
            </div>
          )}
        </div>
      )}
      <div className="nav">
        <img src={logo} alt="logo" />
        <div>
          <div
            onClick={(e) => {
              window.location.href = "/";
            }}
            className="n-field"
          >
            <img src={home} alt="" />
            <p>home</p>
          </div>
          {user && (
            <div
              onClick={(e) => {
                history.push("/myproducts");
              }}
              className="n-field"
            >
              <img src={prod} alt="" />
              <p>my products</p>
            </div>
          )}
          {user.length !== 0 ? (
            <div
              onClick={() => {
                history.push("/user/login");
              }}
              className="n-field"
            >
              <img src={prof} alt="" />
              <p>{user?.name}</p>
            </div>
          ) : (
            <div className="n-field">
              <img
                onClick={() => {
                  history.push("/user/login");
                }}
                src={prof}
                alt=""
              />
              <p>signin</p>
            </div>
          )}
          {user && (
            <div
              onClick={(e) => {
                history.push("/orders");
              }}
              className="n-field"
            >
              <img src={order} alt="" />
              <p>orders</p>
            </div>
          )}
          <div onClick={cartPage} className="n-field">
            <img src={check} alt="" />
            <p>cart</p>
          </div>
          <p className="n-count">{count}</p>
          <div onClick={menuHandler} className="menubar">
            {menuOpen ? <img src={cancel} alt="" /> : <img src={menu} alt="" />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
