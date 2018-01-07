import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native'

import { AsyncCalls, Colors } from 'fcallauPractReactNative/src/commons'

export default class CharacterCell extends Component {

	// Default properties
	static defaultProps = {
		item: {},
		onSelect: () => { }
	}

	render() {
		const { item, onSelect } = this.props

		let thumbnail = item.thumbnail ? { uri: item.thumbnail.path + '.' + item.thumbnail.extension } : require('fcallauPractReactNative/src/resources/placeholder.png')

		return (
			<TouchableOpacity style={styles.container} onPress={() => onSelect(item)}>
				<Image source={thumbnail} style={styles.image} resizeMode={'cover'} />
				<View style={styles.textContainer}>
					<Text style={styles.name}>{item.name}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 0
	},
	image: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width / 1.1
	},
	textContainer: {
		alignItems: 'center',
		padding: 20,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	name: {
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
	},
})