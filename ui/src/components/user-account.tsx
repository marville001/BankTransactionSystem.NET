import { MoreHorizontal } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import WithdrawMoneyModal from "./withdraw-money-modal";
import { useState } from "react";
import SelectAtmModal from "./select-atm-modal";
import TransferMoneyModal from "./transfer-money-modal";

interface UserAccountProps {
	account: Account;
}

const UserAccount = ({ account }: UserAccountProps) => {
	const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
	const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
	const [isSelectAtmModalOpen, setIsSelectAtmModalOpen] = useState(false);

	const [selectedAtm, setSelectedAtm] = useState<Atm | null>(null);

	return (
		<div className="w-full gap-2 p-3 mb-3 transition-all bg-white rounded-lg shadow-sm hover:scale-105 shadow-primary">
			<div className="flex justify-between gap-4">
				<div className="flex-1">
					<h3 className="text-lg font-bold truncate">{account.name}</h3>
					<p className="mt-1 truncate text-md opacity-70">{account.accountId?.substring(0, 8)}...{account.accountId?.substring(28)}</p>
				</div>
				<div className="">
					<p className="text-lg ">Ksh <br /> <span className="font-bold text-primary">{account.balance}</span> </p>
				</div>
			</div>

			<div className="flex justify-end mt-2">

				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button variant={"ghost"} size={"sm"} className="p-1 px-2">
							<MoreHorizontal className="text-primary" color="green" size={24} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => setIsSelectAtmModalOpen(true)} className="cursor-pointer">Withdraw</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setIsTransferModalOpen(true)} className="cursor-pointer">Send Money</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<SelectAtmModal
				isOpen={isSelectAtmModalOpen}
				setIsOpen={setIsSelectAtmModalOpen}
				onSelect={(atm) => {
					setSelectedAtm(atm);
					setIsSelectAtmModalOpen(false);
					setIsWithdrawModalOpen(true);
				}}
			/>

			<WithdrawMoneyModal
				selectedAtm={selectedAtm}
				isOpen={isWithdrawModalOpen}
				setIsOpen={setIsWithdrawModalOpen}
				account={account}
				handleClose={() => {
					setIsWithdrawModalOpen(false);
					setSelectedAtm(null);
				}}
			/>

			<TransferMoneyModal
				isOpen={isTransferModalOpen}
				setIsOpen={setIsTransferModalOpen}
				account={account}
				handleClose={() => {
					setIsTransferModalOpen(false);
				}}
			/>
		</div>
	);
};

export default UserAccount;