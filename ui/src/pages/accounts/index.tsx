import UserAccounts from "@/components/user-accounts";
import UserTransactions from "@/components/user-transactions";
import { useAppState } from "@/contexts/app-state.context";
import { getUserAccounts, getUserTransactions } from "@/services/account.services";
import { useEffect } from "react";

const AccountsPage = () => {

  const { user, accounts, setAccounts, setTransactions } = useAppState();

  useEffect(() => {

    const loadUserAccounts = async () => {
      const response = await getUserAccounts();
      if (response.success) {
        setAccounts(response.data);
      }
    };

    const loadUserTransactions = async () => {
      const response = await getUserTransactions();
      if (response.success) {
        setTransactions(response.data);
      }
    };

    if (user?.userId) {
      loadUserAccounts();
      loadUserTransactions();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId]);

  return (
    <div className="p-3 rounded-lg max-w-screen-lg pb-6 mx-auto mt-8 md:px-6 shadow-lg ">

      <UserAccounts accounts={accounts} />

      <UserTransactions />
    </div>
  );
};

export default AccountsPage;