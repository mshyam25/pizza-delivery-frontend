import { orderConstants } from '../constants/orderConstants'
import axios from 'axios'
import { cartConstants } from '../constants/cartConstants'
import API from '../../api'
export const orderReset = () => async (dispatch) => {
  dispatch({ type: orderConstants.ORDER_CREATE_RESET })
}
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_CREATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`${API}/orders`, order, config)

    dispatch({ type: orderConstants.ORDER_CREATE_SUCCESS, payload: data })
    dispatch({ type: cartConstants.CART_RESET })
    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_DETAILS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${API}/orders/${id}`, config)

    dispatch({ type: orderConstants.ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_PAY_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `${API}/orders/payment/${id}`,
      paymentResult,
      config
    )

    dispatch({ type: orderConstants.ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${API}/orders`, config)

    dispatch({ type: orderConstants.ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.USERORDER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${API}/orders/myorders`, config)

    dispatch({ type: orderConstants.USERORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.USERORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const orderConfirmation = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_CONFIRM_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${API}/orders/confirm/${id}`, {}, config)

    dispatch({ type: orderConstants.ORDER_CONFIRM_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_CONFIRM_REQUEST,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const orderDelivery = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_DELIVER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${API}/orders/deliver/${id}`, {}, config)
    dispatch({ type: orderConstants.ORDER_DELIVER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DELIVER_REQUEST,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
