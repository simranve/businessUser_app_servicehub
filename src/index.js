import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {createStore,combineReducers,compose,applyMiddleware} from 'redux'
import thunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import subBusiness from './store/reducers/subBusiness'
import professional from './store/reducers/professional'
import subCategory from './store/reducers/subCategory'
import bussiness from './store/reducers/bussiness'
import report from './store/reducers/report'
import order from './store/reducers/order'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  subBusiness:subBusiness,
  professional:professional,
  subCategory:subCategory,
  bussiness:bussiness,
  report:report,
  order:order
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store={store}>
      
    <App /> 
  </Provider>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
