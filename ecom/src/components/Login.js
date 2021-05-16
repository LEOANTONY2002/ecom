import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../actions/userAction";
import "./Register.css";
import lout from "./images/lout.png";
import Cookies from "js-cookie";

function Login({ name, mail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, fail } = useSelector((state) => state.logUser);

  useEffect(() => {});

  const signin = async (e) => {
    const log = await dispatch(login(email, password));
    console.log(user);
    if (user) {
      console.log(user);
      window.location.href = "/user/login";
    }
  };

  return (
    <div className="register">
      <div className="heading">
        <p>LOGIN</p>
      </div>
      <div className="reg">
        {!mail ? (
          <>
            <div>
              <p>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <p>Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {fail && <p className="fail">{fail}</p>}
            </div>
            <button onClick={signin}>LOGIN</button>
            <p>
              Don't have an account?<Link to="/user/register">Signup</Link>
            </p>
          </>
        ) : (
          <>
            <p className="greet">
              Hi <span>{name}</span> You have logged in as <span>{mail}</span>
            </p>
            <div
              onClick={() => {
                Cookies.remove("ecom_user");
                window.top.location = window.top.location;
              }}
              className="logout"
            >
              <img src={lout} alt="logout" />
              <p>LOGOUT</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
