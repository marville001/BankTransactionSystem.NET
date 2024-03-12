import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="h-screen flex items-center justify-center flex-col">
			<h2 className="text-4xl">404</h2>

			<p className="py-4 text-lg">Page not found</p>

			<Button asChild>
				<Link to="/" className="mt-4 ">Go back to home</Link>
			</Button>
		</div>
	);
};

export default NotFound;