import Cookies from "js-cookie";

const user = Cookies.getJSON("ecom_user");

export const registerReducer = (state = { user }, action) => {
  console.log(action);
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { loading: true, user: action.payload };
    case "REGISTER_SUCCESS":
      return { loading: false, user: action.payload };
    case "REGISTER_FAIL":
      return { loading: false, user: false, fail: action.payload };
    default:
      return state;
  }
};

export const loginReducer = (state = { user }, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { loading: true, user: action.payload };
    case "LOGIN_SUCCESS":
      return { loading: false, user: action.payload };
    case "LOGIN_FAIL":
      return { loading: false, user: false, fail: action.payload };
    default:
      return state;
  }
};
