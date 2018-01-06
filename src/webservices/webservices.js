import axios from 'axios'
import * as constants from './constants'

export function configureAxios() {
	axios.defaults.baseURL = constants.BASE_URL;
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.common['Referer'] = 'http://fcallau.com';
}