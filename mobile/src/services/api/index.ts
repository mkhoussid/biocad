import axios from 'axios';

import { store } from '#store/index';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
	baseURL: API_URL,
});

api.interceptors.request.use((config) => {
	const token = store.getState().auth.token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
