import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reducer from './reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import indexSaga from './sagas/index_saga';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import set_user from './actions/set_user';
import set_interactions from './actions/set_interactions';
import set_avatar from './actions/set_avatar';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(indexSaga);

if(localStorage.getItem('jwtToken')){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(set_user(jwt.decode(localStorage.jwtToken)));
}

if(localStorage.getItem('interactions')){
  setAuthorizationToken(localStorage.interactions);
  store.dispatch(set_interactions(jwt.decode(localStorage.interactions)));
}

if(localStorage.getItem('avatar')){
  store.dispatch(set_avatar(localStorage.avatar));
}

ReactDOM.render(
  <Provider store = { store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,document.getElementById('root')
);
//registerServiceWorker();
