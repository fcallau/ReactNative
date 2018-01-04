import React, { Component } from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'
import marvelApi from 'marvel-comics-api'

export default class CharactersList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			list: []
		}
	}

	componentWillMount() {
		console.log('componentWillMount')

		/*configure()

		fetchCharacters('008abb5088d79a81730f1f91339609a4')*/

		marvelApi('characters', {
			publicKey: '008abb5088d79a81730f1f91339609a4',
			timeout: 4000,
			query: {
				limit: 50
			},
			headers: {
				Referer: 'http://fcallau.com'
			}
		}, function (err, body) {
			if (err) throw err

			// total # of items
			console.log('body.data.total: ', body.data.total)

			// array of characters
			console.log('body.data.results: ', body.data.results)

			const list = body.data && body.data.results ? body.data.results : []

			this.setState({ list: list })
		})
	}

	render() {
		return (
			<View>
				<Text>{'Texto prueba'}</Text>
			</View>
		)
	}
}

export function configure() {
	axios.defaults.baseURL = 'https://gateway.marvel.com/v1/public';
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.common['Referer'] = 'http://fcallau.com';
}

export function fetchCharacters(publicApiKey) {
	const url = '/characters?apikey=' + publicApiKey
	axios.get(url).then((response) => {
		console.log("fetch respone: ", response)
	}).catch((error) => {
		console.log("fetch error: ", error)
	})
}