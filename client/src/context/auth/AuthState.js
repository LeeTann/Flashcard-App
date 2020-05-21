import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import setAuthToken from './setAuthToken'
import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'


const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // ACTIONS
  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token)

    try {
      const res = await axios.get('/api/login/user')
      console.log("res", res)

      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Register User
  const registerUser = async (formData) => {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const res = await axios.post('/api/register/user', formData, headers)
      console.log("res.......",res)

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err
      })
    }
  }

  // Login User
  const loginUser = async (formData) => {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const res = await axios.post('/api/login/user', formData, headers)
      console.log("res::", res)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      })
    }
  }

  // Logout
  const logout = () => dispatch({ type: LOGOUT })

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })


  return (
    <AuthContext.Provider value={{
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: true,
      user: null,
      error: null,
      loadUser,
      registerUser,
      loginUser,
      logout,
      clearErrors
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState