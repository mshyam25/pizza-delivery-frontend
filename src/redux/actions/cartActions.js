import { cartConstants } from '../constants/cartConstants'

export const addToCart = (customPizza) => async (dispatch, getState) => {
  dispatch({
    type: cartConstants.CART_ADD_ITEM,
    payload: customPizza,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const addPayment = (paymentMethod) => async (dispatch, getState) => {
  dispatch({
    type: cartConstants.CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  })
  localStorage.setItem('payment', JSON.stringify(paymentMethod))
}

export const addDeliveryAddress =
  (deliveryAddress) => async (dispatch, getState) => {
    dispatch({
      type: cartConstants.CART_ADD_DELIVERY_ADDRESS,
      payload: deliveryAddress,
    })
    localStorage.setItem('deliveryAddress', JSON.stringify(deliveryAddress))
  }

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: cartConstants.CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
