// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appState from './reducers'
import App from './App';

const store = createStore(
  appState,
  applyMiddleware(thunk)
);

export default class Root extends Component<{}> {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
