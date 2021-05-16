import Axios from "../axios";

export const addShippingAddress = (address) => async (dispatch) => {
  dispatch({ type: "ADD_SHIPPING_REQUEST", payload: null });
  try {
    const data = await Axios.post("/user/shipping", address);
    dispatch({ type: "ADD_SHIPPING_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_SHIPPING_FAIL", payload: error.response.data });
  }
};

export const getShippingAddress = (email) => async (dispatch) => {
  dispatch({ type: "GET_SHIPPING_REQUEST", payload: null });
  try {
    const { data } = await Axios.get(`/user/shipping/${email}`);
    dispatch({ type: "GET_SHIPPING_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_SHIPPING_FAIL", payload: error.response.data });
  }
};
