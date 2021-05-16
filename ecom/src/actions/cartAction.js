import Cookies from "js-cookie";
import Axios from "../axios";

const user = Cookies.getJSON("ecom_user");

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.post(`/product/${id}`);

    await dispatch({
      type: "ADD_TO_CART",
      payload: {
        _id: data._id,
        name: data.name,
        desc: data.desc,
        image: data.image,
        price: data.price,
        stock: data.stock,
        qty: qty,
      },
    });

    const {
      cart: { cartItems },
    } = getState();
    console.log(cartItems);

    Cookies.set(`${user.email}_cart`, JSON.stringify(cartItems), {
      expires: 5,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

    const {
      cart: { cartItems },
    } = getState();

    Cookies.set(`${user.email}_cart`, JSON.stringify(cartItems), {
      expires: 5,
    });
  } catch (error) {
    console.log(error);
  }
};
