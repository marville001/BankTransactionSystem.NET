import { Separator } from "./ui/separator";
import UserAccount from "./user-account";

interface UserAccountsProps {
	accounts: Account[];
}
const UserAccounts = ({ accounts }: UserAccountsProps) => {


	return (
		<div>
			<h1 className="text-2xl font-bold">Accounts</h1>
			<Separator className="mt-1 opacity-25" />
			<div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3">
				{
					accounts.map((account, index) => (
						<UserAccount key={index} account={account} />
					))
				}
				{/* <Button variant={"ghost"} asChild>
					<div className="bg-white self-stretch min-h-[115px] hover:scale-105 transition-all cursor-pointer border border-primary border-dashed w-full p-3 gap-2 rounded-lg mb-3">
						<p className="text-primary">Add Account</p>
					</div>
				</Button> */}
			</div>
		</div>
	);
};

export default UserAccounts;