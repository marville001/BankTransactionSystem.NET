
type User = {
	userId: string;
	nationalId: string,
	firstName: string,
	lastName: string,
	email: string,
};

type Account = {
	accountId: string,
	name: string,
	balance: number,
	userId: string,
};

type Atm = {
	atmId: string,
	name: string,
	balance: number;
};

type Transaction = {
	transactionId: string,
	accountId: string,
	amount: number,
	status: string,
	transactionDate: string;
	transactionType: string;
	atm: Atm,
	account: Account;

};