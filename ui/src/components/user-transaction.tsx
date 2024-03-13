import {
	TableCell,
	TableRow,
} from "@/components/ui/table";

interface UserTransactionProps {
	transaction: Transaction;
	index: number;
}
const UserTransaction = ({ transaction, index }: UserTransactionProps) => {
	return (
		<TableRow>
			<TableCell className="font-medium">{index}</TableCell>
			<TableCell>{transaction?.account?.name}</TableCell>
			{/* <TableCell>{transaction?.atm?.name}</TableCell> */}
			<TableCell>{transaction?.amount}</TableCell>
			<TableCell>{transaction?.status}</TableCell>
			<TableCell>{transaction?.transactionType}</TableCell>
			<TableCell>{new Date(transaction?.transactionDate).toLocaleDateString()} {new Date(transaction?.transactionDate).toLocaleTimeString()}</TableCell>
		</TableRow>
	);
};

export default UserTransaction;