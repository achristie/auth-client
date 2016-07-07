import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const AUTH_SERVER_URL = 'http://localhost:3090'

export function signinUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${AUTH_SERVER_URL}/signin`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        browserHistory.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Invalid Login'));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function signupUser({email, password}) {
  return function (dispatch) {
    axios.post(`${AUTH_SERVER_URL}/signup`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        browserHistory.push('/feature');
      })
      .catch((res) => {
        dispatch(authError(res.data.error))
      });
  }
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(AUTH_SERVER_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(res => {
        console.log(res);
      })
  }
}