import { useAppState } from "@/contexts/app-state.context";
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import FullPageLoader from "./full-page-loader";

const AuthGuard = ({ children }: { children: ReactNode; }) => {
	const [loading, setLoading] = useState<boolean>(true);

	const { user } = useAppState();

	const navigate = useNavigate();

	useEffect(() => {

		if (!user?.userId) {
			navigate("/");

			return;
		}

		setLoading(false);
	}, [navigate, user?.userId]);

	if (loading) return <FullPageLoader />;

	return children;
};

export default AuthGuard;