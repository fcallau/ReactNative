import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import * as webservices from 'fcallauPractReactNative/src/webservices/webservices'
import { Colors } from 'fcallauPractReactNative/src/commons'

/* COMPONENTS */
import CharactersList from 'fcallauPractReactNative/src/sections/characters/CharactersList'
import CharacterView from 'fcallauPractReactNative/src/sections/characters/CharacterView'
import CharacterNew from 'fcallauPractReactNative/src/sections/characters/CharacterNew'

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

  renderAddCharacterButton() {
    return (
      <TouchableOpacity style={styles.addButton} onPress={() => { Actions.CharacterNew() }}>
        <Text style={styles.addButtonText}>{'Add'}</Text>
      </TouchableOpacity>
    )
  }

  render() {

    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" title="Marvel Characters">
            <Scene
              key={'CharactersList'}
              component={CharactersList}
              navigationBarStyle={styles.navBar}
              navBarButtonColor={'white'}
              renderRightButton={() => this.renderAddCharacterButton()}
            />
            <Scene
              key={'CharacterView'}
              component={CharacterView}
              navigationBarStyle={styles.navBar}
              navBarButtonColor={'white'}
            />
            <Scene
              key={'CharacterNew'}
              component={CharacterNew}
              navigationBarStyle={styles.navBar}
              navBarButtonColor={'white'}
              title={'Add'}
            />
          </Scene>
        </Router>
      </Provider>
    );

  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.navBar,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  addButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});