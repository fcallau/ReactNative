import * as types from '../types/characters'
import { fetch, post } from 'fcallauPractReactNative/src/webservices/webservices'

function updateCharacterList(value) {
	return {
		type: types.CHARACTERS_UPDATE_LIST,
		value: value
	}
}

function setCharactersFetching(value){
	return {
		type: types.CHARACTERS_SET_FETCHING,
		value: value
	}
} 

export function updateCharacterSelected(value) {
	// console.log('CHARACTERS_UPDATE_CHARACTER value: ', value)
	return {
		type: types.CHARACTERS_UPDATE_CHARACTER,
		value
	}
}

export function fetchCharactersList() {
	return (dispatch, getState) => {
		dispatch(setCharactersFetching(true))
		const fetchUrl = '/characters'
		fetch(fetchUrl)
			.then((response) => {
				dispatch(setCharactersFetching(false))
				// this.setState({ list: response.data.results })
				const list = response.data.results
				dispatch(updateCharacterList(list))
			})
			.catch((error) => {
				dispatch(setCharactersFetching(false))
				console.log("fetch error: ", error)
			})
	}
}