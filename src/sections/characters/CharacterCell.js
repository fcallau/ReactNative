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

		let thumbnail = item.thumbnail ? { uri: item.thumbnail.path + '.' + item.thumbnail.extension } : null

		return (
			<TouchableOpacity style={styles.container} onPress={() => onSelect(item)}>
				<Image source={thumbnail} style={styles.image} resizeMode={'contain'} />
				<Text style={styles.text}>{item.name}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10
	},
	image: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width
	},
	text: {
		backgroundColor: 'transparent',
		position: 'absolute',
		bottom: 0
	}
})