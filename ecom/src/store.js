import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { openReducer } from "./reducers/openReducer";
import { createOrderReducer, getOrdersReducer } from "./reducers/orderReducer";
import {
  createProductReducer,
  deleteProductReducer,
  productCategoryReducer,
  productDetailReducer,
  productListReducer,
  userProductsReducer,
} from "./reducers/productReducer";
import {
  addShippingReducer,
  getShippingReducer,
} from "./reducers/shippingReducer";
import { loginReducer, registerReducer } from "./reducers/userReducer";

const initialState = [];

const reducers = combineReducers({
  regUser: registerReducer,
  logUser: loginReducer,
  model: openReducer,
  product: createProductReducer,
  product: deleteProductReducer,
  productList: productListReducer,
  category: productCategoryReducer,
  userProducts: userProductsReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  ship: addShippingReducer,
  ship: getShippingReducer,
  order: createOrderReducer,
  orders: getOrdersReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducers, compose(...enhancers));

const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
