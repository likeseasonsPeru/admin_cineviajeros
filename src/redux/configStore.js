import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// eslint-disable-next-line no-undef
const configureStore = (initialState = {}) => {
  const initialStore = createStore(
    rootReducer,
    {
      authentication : initialState
    },
    applyMiddleware(thunk),
  );
  return initialStore;
};
  

export default configureStore