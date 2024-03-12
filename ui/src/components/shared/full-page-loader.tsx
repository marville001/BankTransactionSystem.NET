import { Loader } from 'lucide-react';
const FullPageLoader = () => {
	return (
		<div className='fixed inset-0 flex flex-col items-center justify-center bg-white'>
			<p className='text-lg font-bold uppercase opacity-50'>Loading ...</p>
			<Loader size='30px' className='mt-2 animate-spin opacity-85' />
		</div>
	);
};

export default FullPageLoader;