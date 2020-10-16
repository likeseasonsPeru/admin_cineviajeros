import {AUTHENTICATE, DEAUTHENTICATE} from '../types';
import {login} from '../../endpoints/index'
import {saveState, removeState} from '../../utils/localStorage';

export const authenticate =  (email, password) => {
    return async dispatch => {
        const res = await login(email, password);
        if (res.token) {
          saveState({...res, auth: true});
          dispatch({type: AUTHENTICATE, payload: res});
        }
    }
}

export const deauthenticate =  () => {
  return async dispatch => {
      removeState()
      dispatch({type: DEAUTHENTICATE})
  }
} 