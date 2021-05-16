export const addShippingReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_SHIPPING_REQUEST":
      return { loading: true, ship: action.payload };

    case "ADD_SHIPPING_SUCCESS":
      return { loading: false, ship: action.payload };

    case "ADD_SHIPPING_FAIL":
      return { loading: false, ship: false, fail: action.payload };

    default:
      return { state };
  }
};

export const getShippingReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_SHIPPING_REQUEST":
      return { loading: true, ship: action.payload };

    case "GET_SHIPPING_SUCCESS":
      return { loading: false, ship: action.payload };

    case "GET_SHIPPING_FAIL":
      return { loading: false, ship: false, fail: action.payload };

    default:
      return { state };
  }
};
