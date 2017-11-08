import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './styles/index.css';
import App from './components/App';

render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
);
