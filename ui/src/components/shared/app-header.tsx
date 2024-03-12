import { useAppState } from "@/contexts/app-state.context";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { ConfirmModal } from "./confirm-modal";

const AppHeader = () => {

	const { user, logOutUser, accounts } = useAppState();

	const totalAmmount = accounts.reduce((acc, account) => acc + account.balance, 0);

	return (
		<div className="bg-[#f2f2f2] p-3 rounded-lg max-w-screen-lg mx-auto">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-lg font-bold text-gray-800">Accounts</h1>
					<p className="text-sm text-gray-500">Welcome <span className="font-bold">{user?.firstName}</span></p>
				</div>
				<div className="flex items-center gap-5">
					<Button size={"sm"} variant={"outline"} className="text-primary hover:bg-white hover:text-primary">Total:<span className="font-bold">Ksh {totalAmmount}</span> </Button>

					<ConfirmModal message={"Please confirm you want to log out"} onConfirm={logOutUser}>
						<Button variant={"destructive"} size={"sm"}>Log Out <LogOut /> </Button>
					</ConfirmModal>
				</div>
			</div>
		</div>
	);
};

export default AppHeader;