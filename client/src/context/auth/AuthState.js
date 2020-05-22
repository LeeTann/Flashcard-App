import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
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
  const loadUser = () => (dispatch, getState) => {
    
    axios.get('/api/login/user', tokenConfig(getState))
      .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
      }))
      .catch(err => {
        dispatch({
          type: AUTH_ERROR
        })
      })
  }

  const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token
    // Headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    // If token, add to headers
    console.log("token", token)
    if(token) {
      config.headers.authorization = token
    } else {
      delete config.headers.authorization
    }
    return config
  }

  // Register User
  const registerUser = async (formData) => {
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const res = await axios.post('/api/register/user', formData, headers)

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