import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Separator } from "./ui/separator";
import { getAvailableAtms } from "@/services/account.services";
import { Loader } from "lucide-react";

interface SelectAtmModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	onSelect: (atm: Atm) => void;
}

const SelectAtmModal = ({ isOpen, onSelect, setIsOpen }: SelectAtmModalProps) => {
	const [atms, setAtms] = useState<Atm[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadAtms = async () => {
			setIsLoading(true);
			const response = await getAvailableAtms();
			setIsLoading(false);
			if (response.success) {
				setAtms(response.data);
			}
		};
		if (isOpen) loadAtms();
	}, [isOpen]);


	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Select Atm</AlertDialogTitle>
					<Separator />
					{
						isLoading ?
							<div className="flex items-center pt-4 justify-center">
								<Loader className="animate-spin" size={24} />
							</div>
							:
							atms?.length === 0 ?
								<div className="flex items-center justify-center pt-4">No ATM Is Available Right Now</div>
								:
								<div className="pt-5 grid grid-cols-2 gap-2">
									{
										atms.map(atm => (
											<div key={atm.atmId} onClick={() => onSelect(atm)} className="flex min-h-[100px] justify-center hover:bg-primary/10 items-center flex-col cursor-pointer hover:scale-105 transition-all p-4 rounded-lg border border-primary">
												<div>
													<div className="text-lg font-semibold">{atm.name}</div>
												</div>
											</div>
										))
									}
								</div>
					}
				</AlertDialogHeader>
				<div className="flex justify-between mt-6">
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default SelectAtmModal;