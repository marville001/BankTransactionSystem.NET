export const getAxiosError = (error: any) => {
	let errorMessage = error?.response?.data?.message || error?.message;
	if (errorMessage === 'Network Error'
		// || error?.code === 'ERR_BAD_REQUEST'
	) {
		errorMessage = 'Connection Error. Please try again later';
	}

	return errorMessage?.split('/')[0] || 'Failed. Please try again later!';
};