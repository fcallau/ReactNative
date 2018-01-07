import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux';

// import axios from 'axios'
// import marvelApi from 'marvel-comics-api'
// import { AsyncCalls, Colors } from 'fcallauPractReactNative/src/commons'
// import * as constants from 'fcallauPractReactNative/src/webservices/constants'
// import { fetch } from 'fcallauPractReactNative/src/webservices/webservices'
import CharacterCell from './CharacterCell'
import { Colors } from 'fcallauPractReactNative/src/commons'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'fcallauPractReactNative/src/redux/actions/characters'

class CharactersList extends Component {

	componentWillMount() {
			this.props.fetchCharactersList()
	}

	onSelect(character) {
		this.props.updateSelected(character)
	}

	renderHeader() {
		return <ActivityIndicator
		animating={this.props.isFetching}
		size="large" color="grey"/>
		
		if (this.props.isFetching) {
			<View>
				<ActivityIndicator
					animating={this.props.isFetching}
					size="large"
					color="#0000ff"
					style={{marginVertical: 20}}
				/>
			</View>
		} else {
			return null
		}
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
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchCharactersList: () => {
			dispatch(CharactersActions.fetchCharactersList())
		},

		updateSelected: (character) => {
			dispatch(CharactersActions.updateCharacterSelected(character))
			// Actions.CharacterList // Detail
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
})