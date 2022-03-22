import { pizzaConstants } from '../constants/pizzaConstants'

export const pizzaListReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case pizzaConstants.PIZZA_LIST_REQUEST:
      return { loading: true, pizzas: [] }
    case pizzaConstants.PIZZA_LIST_SUCCESS:
      return { loading: false, pizzas: action.payload }
    case pizzaConstants.PIZZA_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const pizzaDetailsReducer = (state = { pizza: {} }, action) => {
  switch (action.type) {
    case pizzaConstants.PIZZA_DETAILS_REQUEST:
      return { loading: true, pizza: {} }
    case pizzaConstants.PIZZA_DETAILS_SUCCESS:
      return { loading: false, pizza: action.payload }
    case pizzaConstants.PIZZA_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const pizzaToppingsReducer = (state = { toppings: [] }, action) => {
  switch (action.type) {
    case pizzaConstants.PIZZA_TOPPINGS_REQUEST:
      return { loading: true, toppings: [] }
    case pizzaConstants.PIZZA_TOPPINGS_SUCCESS:
      return { loading: false, toppings: action.payload }
    case pizzaConstants.PIZZA_TOPPINGS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
