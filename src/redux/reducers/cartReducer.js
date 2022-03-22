import { cartConstants } from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], deliveryAddress: {} },
  action
) => {
  switch (action.type) {
    case cartConstants.CART_ADD_ITEM:
      return { ...state, cartItems: [...state.cartItems, action.payload] }

    case cartConstants.CART_REMOVE_ITEM:
      const items = state.cartItems.filter((item) => item.id !== action.payload)
      return { ...state, cartItems: [...items] }

    case cartConstants.CART_ADD_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload,
      }
    case cartConstants.CART_RESET:
      return {
        ...state,
        cartItems: [],
      }

    case cartConstants.CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload }
    default:
      return state
  }
}
