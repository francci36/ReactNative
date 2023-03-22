import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import Router from './components/Router';
import { store } from './redux';
export default function App() {
 return (
 <Provider store={store}>
 <Router></Router>
 </Provider>
 );
}