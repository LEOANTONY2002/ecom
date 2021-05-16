import Axios from "../axios";

export const createOrder = (order) => async (dispatch) => {
  dispatch({ type: "CREATE_ORDER_REQUEST", payload: [] });
  try {
    const { data } = await Axios.post("/order/create", order);
    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CREATE_ORDER_FAIL", payload: error.response.data });
  }
};

export const getOrders = (email) => async (dispatch) => {
  dispatch({ type: "ORDER_REQUEST", payload: [] });
  try {
    const { data } = await Axios.get(`/order/${email}`);
    dispatch({ type: "ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ORDER_FAIL", payload: error.response.data });
  }
};
