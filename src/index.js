import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.scss'
import { Provider } from 'react-redux'
import configureStore from './redux/configStore';
import * as serviceWorker from './serviceWorker';
import {loadState} from './utils/localStorage';
import { icons } from './assets/icons'
React.icons = icons
const state = loadState();
const store = configureStore(state);

ReactDOM.render(
  <Provider store ={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
