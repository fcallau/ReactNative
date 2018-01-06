import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import CharactersList from 'fcallauPractReactNative/src/sections/characters/CharactersList'
import * as webservices from 'fcallauPractReactNative/src/webservices/webservices'

/* REDUX */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk'

import * as reducers from 'fcallauPractReactNative/src/redux/reducers'
const reducer = combineReducers(reducers)
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
    StatusBar.setBarStyle('light-content')
  }

  render() {

    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene
              key={'CharactersList'}
              component={CharactersList}
              hideNavBar
            />
          </Scene>
        </Router>
      </Provider>
    );

  }
}

const styles = StyleSheet.create({

});