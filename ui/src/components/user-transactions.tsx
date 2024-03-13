import { useAppState } from "@/contexts/app-state.context";
import UserTransaction from "./user-transaction";
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Separator } from "./ui/separator";

const UserTransactions = () => {

	const { transactions } = useAppState();

	return (
		<div className="mt-8">
			<h1 className="text-2xl font-bold">Transactions</h1>
			<Separator className="mt-1 opacity-25" />
			<div className="mt-4">

				<Table>
					<TableCaption>A list of your recent transactions.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">#</TableHead>
							<TableHead>Account</TableHead>
							{/* <TableHead>Atm</TableHead> */}
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Transaction Type</TableHead>
							<TableHead>Transaction Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{
							transactions.map((transaction, index) => (
								<UserTransaction index={index+1} key={index} transaction={transaction} />
							))
						}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default UserTransactions;