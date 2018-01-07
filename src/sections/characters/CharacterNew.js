import React, { Component } from 'react'
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'fcallauPractReactNative/src/redux/actions/characters'

import { Colors } from 'fcallauPractReactNative/src/commons'
import { Input, Button } from 'fcallauPractReactNative/src/widgets'
import ImagePicker from 'react-native-image-picker'

class CharacterNew extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			nameError: '',
			image: null
		}
	}

	validateForm() {
		let valid = true
		let errors = {}

		if (!this.state.name) {
			errors.name = 'Choose a valid name'
			valid = false
		}

		this.setState({
			nameError: errors.name ? errors.name : '',
		})

		return valid
	}

	onSubmit() {
		if (this.validateForm()) {

			const characterData = {
				name: this.state.name,
				image: this.state.image ? 'data:image/jpeg;base64,' + this.state.image.data : null,
			}

			// Implements actions
		}
	}

	onSelectImageTapped() {
		const options = {
			title: 'Select image',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};

		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else {
				this.setState({
					image: response
				});
			}
		});

	}

	render() {
		console.log('this.state.image: ', this.state.image)

		const imageUri = this.state.image ? { uri: this.state.image.uri } : null
		const imageButtonText = this.state.image ? this.state.image.fileName : 'Choose image'
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image source={imageUri} style={styles.imageContainerBackground} resizeMode={'cover'} />
					<TouchableOpacity style={styles.button} onPress={() => this.onSelectImageTapped()}>
						<Text style={styles.textButton}>{imageButtonText}</Text>
					</TouchableOpacity>
				</View>
				<View style={style = styles.inputContainer}>
					<Input
						onChangeText={(v) => this.setState({ name: v })}
						value={this.state.name}
						error={this.state.nameError}
						label={'Name:'}
						placeholder={'Superhero name'}
					/>
				</View>
				<View style={style = styles.buttonContainer}>
					<Button
						label='Save'
						onPress={() => this.onSubmit()}
						isFetching={this.props.isFetching}
					/>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isFetching: state.characters.isFetching
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		postCharacter: (data) => {
			dispatch(CharactersActions.postCharacter(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background
	},
	imageContainerBackground: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	imageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'grey',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width
	},
	button: {
		padding: 10,
		borderColor: Colors.white,
		borderWidth: 1,
		borderRadius: 8,
	},
	textButton: {
		color: Colors.white,
		fontWeight: '600'
	},
	inputContainer: {
		margin: 20,
	},
	buttonContainer: {
		margin: 20,
	}
})