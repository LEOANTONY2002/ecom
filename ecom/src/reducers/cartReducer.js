import Cookies from "js-cookie";

const user = Cookies.getJSON("ecom_user");
const data = Cookies.getJSON(`${user?.email}_cart`) || [];

export const cartReducer = (state = { cartItems: data }, action) => {
  console.log(state.cartItems);
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const product = state.cartItems.find((x) => x._id === item._id);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product._id ? item : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        cartItems: [...state.cartItems.filter((x) => x._id !== action.payload)],
      };

    default:
      return state;
  }
};
