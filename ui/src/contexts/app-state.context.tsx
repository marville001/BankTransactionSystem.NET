"use client";

import { getLoggedInUser } from "@/services/auth.services";
import { Loader } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

interface AppState {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	logOutUser: () => void;
	accounts: Account[];
	setAccounts: Dispatch<SetStateAction<Account[]>>;
	transactions: Transaction[];
	setTransactions: Dispatch<SetStateAction<Transaction[]>>;
}

const AppStateContext = createContext<AppState | null>(null);

const AppStateProvider = ({ children }: { children: ReactNode; }) => {
	const [user, setUser] = useState<User | null>(null);
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loadingApp, setLoadingApp] = useState(true);

	const logOutUser = () => {
		localStorage.removeItem('access-token');
		setUser(null);
	}

	useEffect(() => {
		const accessToken = localStorage.getItem('access-token');

		const loadLoggedInUser = async () => {
			const response = await getLoggedInUser();
			if (response.success) {
				setUser(response.data);
			} else {
				localStorage.removeItem('access-token');
			}
			setLoadingApp(false);
		};
		if (accessToken) {
			loadLoggedInUser();
		} else {
			setLoadingApp(false);
		}
	}, []);

	return (
		<AppStateContext.Provider
			value={{
				user, setUser,
				logOutUser,
				accounts, setAccounts,
				transactions, setTransactions
			}}
		>
			{
				loadingApp ?
					<div className="h-screen flex items-center justify-center">
						<Loader className="animate-spin" size={24} />
					</div>
					:
					children
			}
		</AppStateContext.Provider>
	);
};

export const useAppState = () => {

	const context = useContext(AppStateContext);

	if (!context)
		throw new Error("AppState Context can only be used inside a AppState Provider");

	return context;
};

export default AppStateProvider;