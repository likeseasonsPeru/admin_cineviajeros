import {SHOWBAR, NOSHOWBAR} from '../types';

export const showbar =  () => {
  return async dispatch => {
      dispatch({type: SHOWBAR})
  }
} 
export const noshowbar =  () => {
    return async dispatch => {
        dispatch({type: NOSHOWBAR})
    }
  } 