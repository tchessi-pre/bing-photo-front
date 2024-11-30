import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import appTexts from '@/assets/appTexts.json';

type SearchInputProps = {
	placeholder?: string;
	className?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
	placeholder = appTexts.header.searchPlaceholder,
	className,
}) => (
	<div className={`flex-grow relative ${className}`}>
		<span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
			<Search className='w-4 h-4' />
		</span>
		<Input
			type='text'
			placeholder={placeholder}
			className='w-full pl-10 pr-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
		/>
	</div>
);

export default SearchInput;
