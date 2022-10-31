import * as actionTypes from './types';
import store from '../Store/Store';
import axios from 'axios';
export const loginUser = (user) => ({
    type: actionTypes.LOGIN,
    payload: { user}
  });
  export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  export const retrieveToken = (token) => ({
    type: actionTypes.RETRIEVE_TOKEN,
    payload: token
  });
  export const loginUserError = (message) => ({
    type: LOGIN_USER_ERROR,
    payload: { message }
  });
  
  export const forgotPassword = (forgotUserMail) => ({
    type: FORGOT_PASSWORD,
    payload: { forgotUserMail}
  });
  export const forgotPasswordSuccess = (forgotUserMail) => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: forgotUserMail
  });
  export const forgotPasswordError = (message) => ({
    type: FORGOT_PASSWORD_ERROR,
    payload: { message }
  });
  
  export const resetPassword = ({resetPasswordCode,newPassword,history}) => ({
    type: RESET_PASSWORD,
    payload: { resetPasswordCode,newPassword,history }
  });
  export const resetPasswordSuccess = (newPassword) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: newPassword
  });
  export const resetPasswordError = (message) => ({
    type: RESET_PASSWORD_ERROR,
    payload: { message }
  });
  
  
  
  export const registerUser = (user) => ({
    type: actionTypes.REGISTER,
    payload: {user}
  })
  export const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
  })
  export const registerUserError = (message) => ({
    type: REGISTER_USER_ERROR,
    payload: { message }
  })
  
  export const logoutUser = (state) => ({
    type: actionTypes.LOGOUT,
    payload: state
  });