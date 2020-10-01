import {AUTHENTICATE, DEAUTHENTICATE} from '../types';
import {login} from '../../endpoints/index'

export const authenticate =  (email, password) => {
    return async dispatch => {
        const res = await login(email, password);
        if (res.token) {
          dispatch({type: AUTHENTICATE, payload: res})
        }
    }
}