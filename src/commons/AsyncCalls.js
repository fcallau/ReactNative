import axios from 'axios'
// import marvelApi from 'marvel-comics-api'

export function configure() {
	/*axios.defaults.baseURL = 'https://gateway.marvel.com/v1/public';
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.common['Referer'] = 'http://fcallau.com';*/
}

export function fetchCharacters(publicApiKey) {
	const url = '/characters?apikey=' + publicApiKey
	// let url = '/characters?apikey=' + publicApiKey
	// const url = '/characters?nameStartsWith=Ab&apikey=' + publicApiKey
	console.log('axios.defaults.baseURL: ', axios.defaults.baseURL)
	return axios.get(url)
}

// More calls...
/*export function fetchCharacters(publicApiKey) {
	const url = '/characters?apikey=' + publicApiKey
	// let url = '/characters?apikey=' + publicApiKey
	// const url = '/characters?nameStartsWith=Ab&apikey=' + publicApiKey
	console.log('axios.defaults.baseURL: ', axios.defaults.baseURL)
	return axios.get(url)
}*/

/*export function fetchCharactersList() {
	if (false) {
		configure()

		fetchCharacters('008abb5088d79a81730f1f91339609a4')
	} else {
		marvelApi('characters', {
			publicKey: '008abb5088d79a81730f1f91339609a4',
			timeout: 4000,
			query: {
				limit: 50
			},
			headers: {
				Referer: 'http://fcallau.com'
			}
		}, (err, body) => {
			if (err) throw err

			// total # of items
			console.log('body.data.total: ', body.data.total)

			// array of characters
			console.log('body.data.results: ', body.data.results)

			const list = body.data && body.data.results ? body.data.results : []

			return (
				new Promise((resolve, reject) => {
					if (true) {
						resolve(() => {
							console.log('resolve')
						})
					} else {
						reject(() => {
							console.log('reject')
						})

					}
				})
			)

			// this.setState({ list })
		})
	}
}*/