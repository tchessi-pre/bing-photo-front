import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type SearchInputProps = {
	placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
	placeholder = 'Rechercher...',
}) => (
	<div className='flex-grow mx-4 relative'>
		<span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mr-2'>
			<Search className='w-4 h-4' />
		</span>
		<Input
			type='text'
			placeholder={placeholder}
			className='w-35 pl-10 pr-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
		/>
	</div>
);

export default SearchInput;
