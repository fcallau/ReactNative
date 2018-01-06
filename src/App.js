/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import CharactersList from 'fcallauPractReactNative/src/sections/characters/CharactersList'

import * as webservices from 'fcallauPractReactNative/src/webservices/webservices'

export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
  }

  render() {

    return (

      <Router>
        <Scene key="root">
          <Scene
            key={ 'CharactersList' }
            component={ CharactersList }
          />
        </Scene>
      </Router>

    );

  }
}

const styles = StyleSheet.create({

});