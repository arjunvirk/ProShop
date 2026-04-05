import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const res = await fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(order),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create order");
    }

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const res = await fetch(`http://localhost:8080/api/orders/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to load order details");
    }

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const res = await fetch(`http://localhost:8080/api/orders/${id}/pay`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(paymentResult),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to process payment!");
    }

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const res = await fetch(`http://localhost:8080/api/orders/myorders`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.message,
    });
  }
};
