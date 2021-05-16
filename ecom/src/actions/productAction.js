import Axios from "../axios";

export const createProduct = (product) => async (dispatch) => {
  if (!product._id) {
    dispatch({ type: "CREATE_PRODUCT_REQUEST", payload: [] });
    try {
      const { data } = await Axios.post("/user/product/create", product);
      dispatch({ type: "CREATE_PRODUCT_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "CREATE_PRODUCT_FAIL", payload: error.response.data });
    }
  } else {
    dispatch({ type: "CREATE_PRODUCT_REQUEST", payload: [] });
    try {
      const { data } = await Axios.put(`/user/product/${product._id}`, product);
      dispatch({ type: "CREATE_PRODUCT_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "CREATE_PRODUCT_FAIL", payload: error.response.data });
    }
  }
};

export const getUserProducts = (email) => async (dispatch) => {
  dispatch({ type: "USER_PRODUCTS_REQUEST", payload: [] });
  try {
    const { data } = await Axios.get(`/user/product/${email}`);
    dispatch({ type: "USER_PRODUCTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_PRODUCTS_FAIL", payload: error.response.data });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_REQUEST", payload: [] });
  try {
    const { data } = await Axios.delete(`/user/product/${id}`);
    dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_PRODUCT_FAIL", payload: error.response.data });
  }
};

export const productList = () => async (dispatch) => {
  dispatch({ type: "ALL_PRODUCTS_REQUEST", payload: [] });
  try {
    const { data } = await Axios.get("/product");
    dispatch({ type: "ALL_PRODUCTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ALL_PRODUCTS_FAIL", payload: error });
  }
};

export const productDetail = (id) => async (dispatch) => {
  dispatch({ type: "PRODUCT_DETAILS_REQUEST", payload: [] });
  try {
    const { data } = await Axios.post(`/product/${id}`);
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PRODUCT_DETAILS_FAIL", payload: error.response.data });
  }
};

export const getByCategory = (category) => async (dispatch) => {
  dispatch({ type: "CATEGORY_REQUEST", payload: [] });
  try {
    const { data } = await Axios.get(`/product/category/${category}`);
    dispatch({ type: "CATEGORY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CATEGORY_FAIL", payload: error.response.data });
  }
};
