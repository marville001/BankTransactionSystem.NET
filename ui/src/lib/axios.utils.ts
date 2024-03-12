import axios from 'axios';
import { BASE_API_URL } from '../constants';

const client = axios.create({
	baseURL: BASE_API_URL,
	headers: { 'Content-Type': 'application/json' },
});

client.interceptors.response.use(
	(response) => response
);

export const request = ({ ...options }) => {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('access-token');
		if (token) client.defaults.headers.common.Authorization = `Bearer ${token}`;
	}

	const onSuccess = (response: any) => response;
	const onError = (error: any) => {
		throw error;
	};

	return client({ ...options })
		.then(onSuccess)
		.catch(onError);
};