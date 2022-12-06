import { applyMiddleware} from 'redux';
import {configureStore } from '@reduxjs/toolkit'
import {createStore} from 'redux'
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk]
const initialState = {}
const store = configureStore({
  reducer: rootReducer,  
  initialState,
  middleware: middleware
  })
  // devTools: process.env.NODE_ENV !== 'production',
export default store;