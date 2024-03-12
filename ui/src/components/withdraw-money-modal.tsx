import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Separator } from "./ui/separator";
import { toast } from "react-toastify";
import { withdrawMoney } from "@/services/account.services";
import { Button } from "./ui/button";
import { useAppState } from "@/contexts/app-state.context";

const formSchema = z.object({
	amount: z.string()
});

interface WithdrawMoneyModalProps {
	account: Account;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	selectedAtm: Atm | null;
	handleClose: () => void;
}

const WithdrawMoneyModal = ({ isOpen, account, selectedAtm, handleClose, setIsOpen }: WithdrawMoneyModalProps) => {
	const [error, setError] = useState("");
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: "",
		},
	});
	const {setAccounts,setTransactions} = useAppState();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setError("");
		const response = await withdrawMoney({ ...values, accountId: account.accountId, atmId: selectedAtm?.atmId ?? "" });

		if (!response.success) {
			setError(response.message);
			return;
		}

		setAccounts((accounts) => {
			return accounts.map((acc) => {
				if (acc.accountId === account.accountId) {
					return { ...acc, balance: acc.balance - parseInt(values.amount) };
				}
				return acc;
			});
		});
		setTransactions((transactions) => [response.data, ...transactions]);

		form.reset();
		handleClose();
		toast.success("Withdrawal successful");
	}

	const { isSubmitting } = form.formState;

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Withdraw Money</AlertDialogTitle>
				</AlertDialogHeader>
				<Separator />

				<div className="grid grid-cols-2">
					<div className="">
						<h4>Account</h4>
						<p className="font-semibold truncate">{account.name}</p>
					</div>
					<div className="">
						<h4>Balance</h4>
						<p className="font-semibold">Ksh {account.balance}</p>
					</div>
				</div>
				<div className="">
					<h4>Selected ATM</h4>
					<p className="font-semibold truncate">{selectedAtm?.name}</p>
				</div>

				{
					error && (
						<div className="bg-red-100 text-center text-red-600 p-2 rounded-md mb-4">
							{error}
						</div>
					)
				}

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 my-4">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input type="number" placeholder="Amount eg 50" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-between mt-2">
							<Button variant={"outline"} onClick={handleClose} type="button" disabled={isSubmitting} >Cancel</Button>
							<Button className="" loading={isSubmitting} >Continue</Button>
						</div>
					</form>
				</Form>

			</AlertDialogContent>
		</AlertDialog>
	);
};

export default WithdrawMoneyModal;