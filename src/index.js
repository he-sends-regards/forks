import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/database';
import './index.css';
import App from './components/app/app';
import store from './store/store';

const firebaseConfig = {
  apiKey: 'AIzaSyAPU-E_PmHivwVItwzMqCASJ3RUJuaHquk',
  authDomain: 'forks-2021.firebaseapp.com',
  projectId: 'forks-2021',
  storageBucket: 'forks-2021.appspot.com',
  messagingSenderId: '688396849347',
  appId: '1:688396849347:web:fe91b50d0b4c0c13711276',
  databaseURL: 'https://forks-2021-default-rtdb.firebaseio.com/',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
);
