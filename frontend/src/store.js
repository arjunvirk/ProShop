import { configureStore } from "@reduxjs/toolkit";
import { productListReducer } from "./reducers/productReducers";

const intialState = {};

const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
  preloadedState: intialState,
});

export default store;
