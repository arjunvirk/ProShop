import { configureStore } from "@reduxjs/toolkit";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";

const intialState = {};

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
  },
  preloadedState: intialState,
});

export default store;
