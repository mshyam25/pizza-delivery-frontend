import { userConstants } from '../constants/userConstants'

export const securityQuestionsReducer = (state = { security: [] }, action) => {
  switch (action.type) {
    case userConstants.USER_SECURITY_QUESTIONS_REQUEST:
      return { loading: true, security: [] }
    case userConstants.USER_SECURITY_QUESTIONS_SUCCESS:
      return { loading: false, security: action.payload }
    case userConstants.USER_SECURITY_QUESTIONS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userLoginReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case userConstants.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      return { loading: true }
    case userConstants.USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case userConstants.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case userConstants.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_DETAILS_RESET:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userUpdateReducer = (state = { updatedUser: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_REQUEST:
      return { loading: true }
    case userConstants.USER_UPDATE_SUCCESS:
      return { loading: false, success: true, updatedUser: action.payload }
    case userConstants.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.USER_LIST_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_LIST_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case userConstants.USER_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userFindReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_BY_EMAIL_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_BY_EMAIL_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case userConstants.USER_BY_EMAIL_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_BY_EMAIL_RESET:
      return {}

    default:
      return state
  }
}

export const securityConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_SECURITY_CONFIRMATION_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_SECURITY_CONFIRMATION_SUCCESS:
      return { loading: false, success: true }
    case userConstants.USER_SECURITY_CONFIRMATION_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_SECURITY_CONFIRMATION_RESET:
      return {}

    default:
      return state
  }
}

export const passwordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_PASSWORD_RESET_REQUEST:
      return { ...state, loading: true }
    case userConstants.USER_PASSWORD_RESET_SUCCESS:
      return { loading: false, success: action.payload }
    case userConstants.USER_PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_PASSWORD_RESET_RESET:
      return {}
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_DELETE_REQUEST:
      return { loading: true }
    case userConstants.USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case userConstants.USER_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
