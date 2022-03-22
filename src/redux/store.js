import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  pizzaDetailsReducer,
  pizzaListReducer,
  pizzaToppingsReducer,
} from './reducers/pizzaReducers'
import { cartReducer } from './reducers/cartReducer'
import {
  passwordResetReducer,
  securityConfirmReducer,
  securityQuestionsReducer,
  userDeleteReducer,
  userDetailsReducer,
  userFindReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderConfirmReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  userOrdersReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  pizzaList: pizzaListReducer,
  pizzaDetails: pizzaDetailsReducer,
  pizzaToppings: pizzaToppingsReducer,
  cart: cartReducer,
  securityQuestions: securityQuestionsReducer,
  userLogin: userLoginReducer,
  userFind: userFindReducer,
  secuirtyConfirm: securityConfirmReducer,
  passwordReset: passwordResetReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userOrders: userOrdersReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  orderConfirm: orderConfirmReducer,
  orderDeliver: orderDeliverReducer,
})
const middleware = [thunk]
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const deliveryAddressFromStorage = localStorage.getItem('deliveryAddress')
  ? JSON.parse(localStorage.getItem('deliveryAddress'))
  : []
const userInfoFromStorage = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : null
const paymentInfoFromStorage = localStorage.getItem('payment')
  ? JSON.parse(localStorage.getItem('payment'))
  : null
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    deliveryAddress: deliveryAddressFromStorage,
    paymentMethod: paymentInfoFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
