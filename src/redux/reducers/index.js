import {combineReducers} from 'redux';
import authReducer from './authReducer';
import sidebarReduces from './sidebarReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  sideBar: sidebarReduces,
});

export default rootReducer;