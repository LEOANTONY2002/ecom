import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import csc from "country-state-city";
import "./Shipping.css";
import { addShippingAddress } from "../actions/shippingAction";
import Cookies from "js-cookie";
import { useEffect } from "react";

function Shipping() {
  const user = Cookies.getJSON("ecom_user");
  console.log(user);
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [stat, setStat] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const dispatch = useDispatch();
  const { ship, fail } = useSelector((state) => state.ship);

  useEffect(() => {
    const fetch = async () => {
      const ctc = await csc.getCountryByCode(countryCode);
      setCountry(ctc.name);
      console.log("cnt", country);
      const stc = await csc.getStateByCodeAndCountry(stateCode, countryCode);
      setStat(stc.name);
      console.log(stat);
    };
    fetch();
    if (ship) window.location.href = "/payment";
  }, [ship, country, stat, stateCode, countryCode, city, phone]);

  const addShip = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      dispatch(
        addShippingAddress({
          name: user.name,
          email: user.email,
          address,
          city,
          state: stat,
          country,
          zip,
          phone,
        })
      ).then((window.location.href = "/payment"));
    }, 3000);
  };

  return (
    <div className="shipping">
      <div className="sh-ad">
        <p>SHIPPING ADDRESS</p>
      </div>
      <div className="reg ship">
        <div>
          <p>Address</p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Country</p>
          <select
            className="drop"
            onChange={(e) => setCountryCode(e.target.value)}
            required
          >
            {csc.getAllCountries().map((c) => (
              <option value={c.isoCode}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <p>State</p>
          <select
            className="drop"
            onChange={(e) => setStateCode(e.target.value)}
            required
          >
            {csc.getStatesOfCountry(countryCode).map((s) => (
              <option value={s.isoCode}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <p>City</p>
          <select
            className="drop"
            onChange={(e) => setCity(e.target.value)}
            required
          >
            {csc.getCitiesOfState(countryCode, stateCode).map((s) => (
              <option value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <p>ZIP code</p>
          <input
            type="number"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Phone</p>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        {fail && <p className="fail">{fail}</p>}
        <button onClick={addShip}>SUBMIT</button>
      </div>
    </div>
  );
}

export default Shipping;
