import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native'

// Redux
import { connect } from 'react-redux'
// import * as CharactersActions from 'fcallauPractReactNative/src/redux/actions/characters'

import { Colors } from 'fcallauPractReactNative/src/commons'

class CharacterView extends Component {
	render() {
		console.log('this.props.character: ', this.props.character)
		const {character} = this.props
		const name = character ? character.name : ''
		const thumbnail = character.thumbnail ? { uri: character.thumbnail.path + '.' + character.thumbnail.extension } : null

		return (
			<View style={styles.container}>
				<Image source={thumbnail} style={styles.image} resizeMode={'cover'} />
				<View style={styles.textContainer}>
					<Text style={styles.name}>{name}</Text>
				</View>
			</View>
		)
	}
}

const mapDispatchToProps = (state) => {
	return {
		character: state.characters.item,
	}
}

export default connect(mapDispatchToProps, null)(CharacterView)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
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
		backgroundColor: 'rgba(255, 255, 255, 0.5)'
	},
	name: {
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black',
	},
})