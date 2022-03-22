import { pizzaConstants } from '../constants/pizzaConstants'
import axios from 'axios'
import API from '../../api'
export const listPizzas = () => async (dispatch) => {
  try {
    dispatch({ type: pizzaConstants.PIZZA_LIST_REQUEST })

    const { data } = await axios.get(`${API}/pizzas`)

    dispatch({ type: pizzaConstants.PIZZA_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: pizzaConstants.PIZZA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getPizzaById = (id) => async (dispatch) => {
  try {
    dispatch({ type: pizzaConstants.PIZZA_DETAILS_REQUEST })

    const { data } = await axios.get(`${API}/pizzas/customise/${id}`)

    dispatch({ type: pizzaConstants.PIZZA_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: pizzaConstants.PIZZA_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getPizzaToppings = () => async (dispatch) => {
  try {
    dispatch({ type: pizzaConstants.PIZZA_TOPPINGS_REQUEST })

    const { data } = await axios.get(`${API}/pizzas/toppings`)
    dispatch({ type: pizzaConstants.PIZZA_TOPPINGS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: pizzaConstants.PIZZA_TOPPINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
