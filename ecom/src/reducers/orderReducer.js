export const createOrderReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
      return { loading: true, order: action.payload };

    case "CREATE_ORDER_SUCCESS":
      return { loading: false, order: action.payload };

    case "CREATE_ORDER_FAIL":
      return { loading: false, fail: action.payload };

    default:
      return { state };
  }
};

export const getOrdersReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case "ORDER_REQUEST":
      return { loading: true, orders: action.payload };

    case "ORDER_SUCCESS":
      return { loading: false, orders: action.payload };

    case "ORDER_FAIL":
      return { loading: false, fail: action.payload };

    default:
      return { state };
  }
};
