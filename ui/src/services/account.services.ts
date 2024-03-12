
import { apiCall } from "./helpers";

export const getUserAccounts = async () => {
	return await apiCall({
		url: 'accounts',
	});
};

export const withdrawMoney = async (details: { accountId: string; atmId: string; amount: string; }) => {
	console.log(details);
	return await apiCall({
		url: 'accounts/withdraw',
		method: 'POST',
		data: details,
	});
};

export const getAvailableAtms = async () => {
	return await apiCall({
		url: 'atms',
	});
};

export const getUserTransactions = async () => {
	return await apiCall({
		url: `transactions`,
	});
}