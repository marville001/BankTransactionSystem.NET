import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginUser } from "@/services/auth.services";
import { useEffect, useState } from "react";
import { useAppState } from "@/contexts/app-state.context";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
	nationalId: z.string().min(8,
		{ message: "ID must be 8 characters.", })
		.max(8, { message: "ID must be 8 characters.", }),
	password: z.string().min(8, { message: "Password must be at least 6 characters.", }),
});

const LoginPage = () => {
	const [error, setError] = useState("");

	const { user, setUser } = useAppState();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nationalId: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setError("");
		const response = await loginUser(values);

		if (!response.success) {
			setError(response.message);
			return;
		}

		setUser(response.data);
		toast.success("Login successful");
	}

	useEffect(() => {
		if (user?.userId) {
			navigate("/app");
		}
	}, [navigate, user?.userId]);


	const { isSubmitting } = form.formState;

	return (
		<div className="flex items-center justify-center h-screen p-3">

			<div className="bg-white w-full sm:w-[400px] shadow rounded-lg p-4 mx-auto">
				<h1 className="text-lg font-bold">Welcome</h1>
				<p className="mt-2">Please provide credentials to access account</p>

				<Separator className="my-4 opacity-60" />

				{
					error && (
						<div className="p-2 mb-4 text-center text-red-600 bg-red-100 rounded-md">
							{error}
						</div>
					)
				}

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="my-4 space-y-3">
						<FormField
							control={form.control}
							name="nationalId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ID Number</FormLabel>
									<FormControl>
										<Input placeholder="id number eg 12345678" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="********" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-between">
							<Link to="/register" className="underline text-primary">Create an account here</Link>
							<Button loading={isSubmitting} type="submit">Submit</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default LoginPage;