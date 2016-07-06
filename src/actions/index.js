import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER } from './types';

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

      });
  }
}