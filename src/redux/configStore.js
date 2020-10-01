import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';


// eslint-disable-next-line no-undef
const configureStore = (initialState = {}) => {
  const initialStore = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk),
  );
  return initialStore;
};

export default configureStore