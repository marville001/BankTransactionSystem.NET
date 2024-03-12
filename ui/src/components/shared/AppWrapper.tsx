import { Outlet } from "react-router-dom";
import AppHeader from "./app-header";

const AppWrapper = () => {
	return (
		<div className="py-4 md:py-8 px-4 md:px-8">
			<AppHeader />
			<Outlet />
		</div>
	);
};

export default AppWrapper;