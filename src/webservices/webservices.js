import axios from 'axios'
import * as constants from './constants'

export function configureAxios() {
	axios.defaults.baseURL = constants.BASE_URL;
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.common['Referer'] = 'http://fcallau.com';
}

export function fetch(url) {
	// '/characters?nameStartsWith=Ab&apikey=' + publicApiKey
	const urlWithPublicApiKey = url + '?limit=100&offset=0&apikey=' + constants.PUBLIC_API_KEY

	return new Promise(function (resolve, reject) {
		axios.get(urlWithPublicApiKey)
			.then(response => {
				if (response.data) {
					console.log('response.data: ', response.data)
					resolve(response.data)
				} else {
					reject(response)
				}
			})
			.catch(error => {
				reject(error)
			})
	})
}

export function fetchAlternativo(url) {
	const urlWithPublicApiKey = url + '?apikey=' + constants.PUBLIC_API_KEY

	return axios.get(urlWithPublicApiKey)
		.then((response) => {
			return response.data
		})
		.catch((error) => {
			if (error.response) {
				throw { code: error.response.status, msg: error.response.data, error: error }
			} else {
				throw { code: 500, msg: error.message, error: error }
			}
		})
}