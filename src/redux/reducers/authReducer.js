import {AUTHENTICATE, DEAUTHENTICATE} from '../types';

const initialState = {
  token: null,
  auth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.payload.token,
        auth: true,
      };
    case DEAUTHENTICATE:
      return {
        token: null,
        auth: false,
      };
    default:
      return state;
  }
};