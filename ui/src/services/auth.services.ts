import { request } from '@/lib/axios.utils';
import { getAxiosError } from '@/lib/getAxiosError';

export type LoginInfo = {
	nationalId: string;
	password: string;
};

export type RegisterInfo = {
	nationalId: string,
	firstName: string,
	lastName: string,
	email: string,
	password: string;
};

export const loginUser = async (details: LoginInfo) => {
	try {
		const { data } = await request({
			url: 'auth/login',
			method: 'POST',
			data: details,
		});

		const { token, ...userDetails } = data;
		localStorage.setItem('access-token', token);

		return { success: true, data: userDetails };
	} catch (error: any) {
		return { success: false, message: getAxiosError(error) };
	}
};

export const getLoggedInUser = async () => {
	try {
		const accessToken = localStorage.getItem('access-token');

		if (!accessToken) {
			return { success: false, message: 'No access token found' };
		}

		const { data } = await request({
			url: 'auth/me'
		});

		const { token, ...userDetails } = data;
		localStorage.setItem('access-token', token);

		return { success: true, data: userDetails };
	} catch (error: any) {
		return { success: false, message: getAxiosError(error) };
	}
};

export const registerAccount = async (details: RegisterInfo) => {
	try {
		const { data } = await request({
			url: 'auth/register',
			method: 'POST',
			data: details,
		});

		const { token, ...userDetails } = data;
		localStorage.setItem('access-token', token);

		return { success: true, data: userDetails };
	} catch (error: any) {
		return { success: false, message: getAxiosError(error) };
	}
};