export const createProductReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case "CREATE_PRODUCT_REQUEST":
      return { loading: true, product: action.payload };

    case "CREATE_PRODUCT_SUCCESS":
      return { loading: false, product: action.payload };

    case "CREATE_PRODUCT_FAIL":
      return { loading: false, fail: action.payload };

    default:
      return { state };
  }
};

export const deleteProductReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case "DELETE_PRODUCT_REQUEST":
      return { loading: true, product: action.payload };

    case "DELETE_PRODUCT_SUCCESS":
      return { loading: false, product: action.payload };

    case "DELETE_PRODUCT_FAIL":
      return { loading: false, fail: action.payload };

    default:
      return { state };
  }
};

export const productListReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case "ALL_PRODUCTS_REQUEST":
      return { loading: true, products: action.payload };

    case "ALL_PRODUCTS_SUCCESS":
      return { loading: false, products: action.payload };

    case "ALL_PRODUCTS_FAIL":
      return { loading: false, fail: action.payload };

    default:
      return { state };
  }
};

export const productCategoryReducer = (state=[], action) => {
  switch (action.type) {
    case "CATEGORY_REQUEST":
      return { catload: true, catprods: action.payload}

    case "CATEGORY_SUCCESS":
      return { catload: false, catprods: action.payload}

    case "CATEGORY_FAIL":
      return { catload: false, catfail: action.payload}
  
    default:
      return {state}
  }
}

export const userProductsReducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case "USER_PRODUCTS_REQUEST":
      return { uload: true, products: action.payload };

    case "USER_PRODUCTS_SUCCESS":
      return { uload: false, products: action.payload };

    case "USER_PRODUCTS_FAIL":
      return { uload: false, ufail: action.payload };

    default:
      return { state };
  }
};

export const productDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { loading: true, product: action.payload };
    case "PRODUCT_DETAILS_SUCCESS":
      return { loading: false, product: action.payload };
    case "PRODUCT_DETAILS_FAIL":
      return { loading: false, product: action.payload };

    default:
      return { state };
  }
};
