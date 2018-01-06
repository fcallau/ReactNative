import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'
// import marvelApi from 'marvel-comics-api'
import { AsyncCalls, Colors } from 'fcallauPractReactNative/src/commons'

export default class CharactersList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			list: []
		}
	}

	componentWillMount() {
		// AsyncCalls.configure()
		AsyncCalls.fetchCharacters('008abb5088d79a81730f1f91339609a4').then(
			(response) => {
				const nuestraLista = response.data.data.results && response.data.data.results ? response.data.data.results : []
				this.setState({ list: nuestraLista })
			}
		).catch(
			(error) => {
				console.log("fetch error: ", error)
			}
			)
	}

	renderItem(item, index) {
		return (
			<View style={{ height: 200, backgroundColor: Colors.red, marginVertical: 10 }}>
				<Text>{item.name}</Text>
				<Text>{item.description}</Text>
				<Text>{index}</Text>
			</View>
		)
	}

	render() {
		return (
			<View>
				<FlatList
					data={this.state.list}
					renderItem={({ item, index }) => this.renderItem(item, index)}
					keyExtractor={(item, index) => item.id}
					extraData={this.state}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	xx: {
		height: 100,
		marginVertical: 20
	}
})