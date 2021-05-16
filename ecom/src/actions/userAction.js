import axios from "../axios";
import Cookies from "js-cookie";

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST", payload: null });
  try {
    const { data } = await axios.post("/user/register", {
      name,
      email,
      password,
    });
    await dispatch({ type: "REGISTER_SUCCESS", payload: data });
    Cookies.set("ecom_user", JSON.stringify(data), { expires: 37 });
  } catch (error) {
    dispatch({ type: "REGISTER_FAIL", payload: error.response.data });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST", payload: null });
  try {
    const { data } = await axios.post("/user/login", { email, password });
    await dispatch({ type: "LOGIN_SUCCESS", payload: data });
    Cookies.set("ecom_user", JSON.stringify(data), { expires: 37 });
    console.log(
      Cookies.set("ecom_user", JSON.stringify(data), { expires: 37 })
    );
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
  }
};
