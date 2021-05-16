import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../actions/userAction";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, fail } = useSelector((state) => state.regUser);

  const reg = async (e) => {
    if (dispatch(register(name, email, password))) {
      if (user) {
        console.log(user);
        window.location.href = "/user/login";
      }
    }
  };

  return (
    <div className="register">
      <div className="heading">
        <p>REGISTER</p>
      </div>
      <div className="reg">
        <div>
          <p>UserName</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button onClick={reg}>SIGN UP</button>
        <p>
          Already have an account?<Link to="/user/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
