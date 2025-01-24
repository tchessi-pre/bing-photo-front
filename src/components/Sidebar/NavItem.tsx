import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type NavItemProps = {
	href: string;
	icon: React.ElementType;
	label: string;
};

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label }) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	const [isTooltipVisible, setIsTooltipVisible] = useState(false);
	let timeoutId: NodeJS.Timeout;

	const handleMouseEnter = () => {
		timeoutId = setTimeout(() => setIsTooltipVisible(true), 200); 
	};

	const handleMouseLeave = () => {
		clearTimeout(timeoutId);
		setIsTooltipVisible(false);
	};

	return (
		<div className="relative">
			<Link
				href={href}
				className={`block py-2 px-2 rounded transition-colors duration-200 ease-in-out ${isActive ? 'bg-gray-300 text-green-700' : 'hover:bg-gray-300'
					}`}
				aria-current={isActive ? 'page' : undefined}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<Icon
					className={`w-8 h-8 transform transition-transform duration-200 ease-in-out hover:scale-110 ${isActive ? 'text-green-700' : 'text-gray-600'
						}`}
				/>
			</Link>

			{isTooltipVisible && (
				<span
					className="absolute z-50 left-full top-1/2 ml-2 transform -translate-y-1/2 bg-gray-800 text-white text-sm font-semibold rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap"
					style={{
						clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)',
					}}
				>
					{label}
				</span>
			)}
		</div>
	);
};

export default NavItem;