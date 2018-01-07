import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux';

import CharacterCell from './CharacterCell'
import { Colors } from 'fcallauPractReactNative/src/commons'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'fcallauPractReactNative/src/redux/actions/characters'

var Spinner = require('react-native-spinkit');

let activityIndicatorWidth = 0
let activityIndicatorHeight = 0

class CharactersList extends Component {

	componentWillMount() {
		this.props.fetchCharactersList()
	}

	onSelect(character) {
		this.props.updateSelected(character)
	}

	measureActivityIndicator(event) {
		activityIndicatorWidth = event.nativeEvent.layout.width
		activityIndicatorHeight = event.nativeEvent.layout.height
	}

	renderHeader() {
		return <Spinner
			style={styles.spinner}
			isVisible={this.props.isFetching}
			size={100}
			type={'Arc'}
		/>

		/*return <ActivityIndicator
			onLayout={(event) => this.measureActivityIndicator(event)}
			animating={this.props.isFetching}
			size="large" color="grey"
			style={styles.activityIndicator}
		/>*/
	}

	renderItem(item, index) {
		return (
			<CharacterCell
				item={item}
				onSelect={(character) => this.onSelect(character)}
			/>
		)
	}
	/*<Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color={this.state.color} />*/
	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.list}
					ListHeaderComponent={() => this.renderHeader()}
					renderItem={({ item, index }) => this.renderItem(item, index)}
					keyExtractor={(item, index) => item.id}
					extraData={this.props}
				/>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		list: state.characters.list,
		isFetching: state.characters.isFetching,
		character: state.characters.item
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchCharactersList: () => {
			dispatch(CharactersActions.fetchCharactersList())
		},

		updateSelected: (character) => {
			dispatch(CharactersActions.updateCharacterSelected(character))
			// Detail view
			Actions.CharacterView({ title: character.name })
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	activityIndicator: {
		position: 'absolute',
		left: Dimensions.get('window').width / 2 - 18,
		top: Dimensions.get('window').height / 2 - 18 - 20
	},
	spinner: {
		position: 'absolute',
		left: Dimensions.get('window').width / 2 - 50,
		top: Dimensions.get('window').height / 2 - 50 - 20,
		color: Colors.white
	},
})