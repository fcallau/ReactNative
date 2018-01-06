import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'
// import marvelApi from 'marvel-comics-api'
// import { AsyncCalls, Colors } from 'fcallauPractReactNative/src/commons'
// import * as constants from 'fcallauPractReactNative/src/webservices/constants'
import { fetch } from 'fcallauPractReactNative/src/webservices/webservices'
import CharacterCell from './CharacterCell'

export default class CharactersList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			list: [],
			selected: null
		}
	}

	componentWillMount() {
		fetch('/characters')
			.then((response) => {
				this.setState({ list: response.data.results })
			})
			.catch((error) => {
				console.log("fetch error: ", error)
			})
	}

	onSelect(character) {
		this.setState({ selected: character })
	}

	renderItem(item, index) {
		return (
			<CharacterCell
				item={item}
				onSelect={(character) => this.onSelect(character)}
			/>
		)
	}

	render() {
		return (
			<View style={styles.container}>
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
	container: {
		flex: 1,
		backgroundColor: '#666',
	},
})