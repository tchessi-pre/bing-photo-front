'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
import navItems from './navItemsConfig';
import CameraIcon from '@/assets/icons/camera-svgrepo-com.svg';
import { useMobile } from '@/hooks/useMobile';
import { CameraModal, PermissionDeniedModal } from '../camera';
import { useCamera } from '@/hooks/useCamera';

type SidebarSpeedDialProps = {
	isOpen: boolean;
	toggleOpen: () => void;
};

const SidebarSpeedDial: React.FC<SidebarSpeedDialProps> = ({ isOpen, toggleOpen }) => {
	const isMobile = useMobile();
	const {
		isCameraOpen,
		permissionDenied,
		openCamera,
		closeCamera,
		setPermissionDenied,
		videoRef,
		capturePhoto,
		photo,
	} = useCamera();

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{/* Bouton principal */}
			<div
				onClick={toggleOpen}
				className="w-14 h-14 rounded-full bg-green-800 text-white shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out"
			>
				{isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
			</div>

			{isOpen && (
				<div className="absolute bottom-24 flex flex-col items-center space-y-4 transition-all duration-500 ease-in-out">
					{/* Navigation items */}
					{navItems.map((item, index) => (
						<div
							key={item.href}
							onClick={() => (window.location.href = item.href)}
							className="w-14 h-14 rounded-full bg-gray-300 text-gray-800 shadow-md flex items-center justify-center hover:bg-gray-400 cursor-pointer transition-opacity duration-500 ease-in-out"
							style={{
								opacity: isOpen ? 1 : 0,
								transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
								transitionDelay: `${index * 100}ms`,
							}}
							aria-label={item.label}
						>
							<item.icon className="w-8 h-8" />
						</div>
					))}

					{/* Icône de caméra visible uniquement sur mobile */}
					{isMobile && (
						<div
							onClick={openCamera}
							className="w-14 h-14 rounded-full bg-gray-300 text-white shadow-md flex items-center justify-center hover:bg-gray-400 cursor-pointer transition-opacity duration-500 ease-in-out"
							aria-label="Caméra"
						>
							<CameraIcon className="w-8 h-8" />
						</div>
					)}
				</div>
			)}

			{/* Modals */}
			{isCameraOpen && (
				<CameraModal
					videoRef={videoRef}
					onClose={closeCamera}
					onCapture={() => {
						capturePhoto();
						console.log('Photo capturée avec succès');
					}}
				/>
			)}

			{permissionDenied && (
				<PermissionDeniedModal onClose={() => setPermissionDenied(false)} />
			)}

			{/* Photo capturée */}
			{photo && (
				<div className="fixed bottom-24 left-4 z-50">
					<img src={photo} alt="Photo capturée" className="w-32 h-32 rounded shadow-lg" />
				</div>
			)}
		</div>
	);
};

export default SidebarSpeedDial;
