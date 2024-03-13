
import { apiCall } from "./helpers";

export const getUserAccounts = async () => {
	return await apiCall({
		url: 'accounts',
	});
};

export const withdrawMoney = async (details: { accountId: string; atmId: string; amount: string; }) => {
	return await apiCall({
		url: 'accounts/withdraw',
		method: 'POST',
		data: details,
	});
};

export const transferMoney = async (details: { accountId: string; receiverAccountId: string; amount: string; }) => {
	return await apiCall({
		url: 'accounts/transfer',
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