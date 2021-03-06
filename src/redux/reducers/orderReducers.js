import { orderConstants } from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_CREATE_REQUEST:
      return { loading: true }
    case orderConstants.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case orderConstants.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }

    case orderConstants.ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case orderConstants.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case orderConstants.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case orderConstants.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_PAY_REQUEST:
      return { loading: true }
    case orderConstants.ORDER_PAY_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case orderConstants.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload }

    case orderConstants.ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstants.ORDER_LIST_REQUEST:
      return { ...state, loading: true }
    case orderConstants.ORDER_LIST_SUCCESS:
      return { loading: false, success: true, orders: action.payload }
    case orderConstants.ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstants.USERORDER_LIST_REQUEST:
      return { ...state, loading: true }
    case orderConstants.USERORDER_LIST_SUCCESS:
      return { loading: false, success: true, orders: action.payload }
    case orderConstants.USERORDER_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const orderConfirmReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case orderConstants.ORDER_CONFIRM_REQUEST:
      return { ...state, loading: true }
    case orderConstants.ORDER_CONFIRM_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case orderConstants.ORDER_CONFIRM_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const orderDeliverReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case orderConstants.ORDER_DELIVER_REQUEST:
      return { ...state, loading: true }
    case orderConstants.ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case orderConstants.ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
