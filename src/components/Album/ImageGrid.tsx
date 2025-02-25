'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CircleCheckBig, ZoomIn } from 'lucide-react';

import ImageModal from '@/components/customs/ImageModal';
import { getRandomGridSpan } from '@/lib/gridUtils';
import { generateConfetti } from '@/lib/confettiUtils';
import ScanSuccessMessage from './customs-composents/ScanSuccessMessage';

/** Types pour les props */
type ImageGridProps = {
	images: { src: string; alt: string; label?: string }[];
	selectedImages: Set<number>;
	onImageSelect: (index: number) => void;
	onDelete: (index: number) => void;
	scanning?: boolean;
};

interface ConfettiItem {
	left: string; // ex: "45%"
	color: string; // ex: "#F59E0B"
}

const ImageGrid: React.FC<ImageGridProps> = ({
	images,
	selectedImages,
	onImageSelect,
	onDelete,
	scanning = false,
}) => {
	// État pour afficher le modal “zoom”
	const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);

	// On utilise un ref pour stocker un “span” aléatoire par image (effet mosaïque)
	const gridSpansRef = useRef<string[]>(images.map(() => getRandomGridSpan()));

	// Permet de détecter la fin du scanning (ancien scanning => nouveau scanning)
	const prevScanningRef = useRef(scanning);

	// État pour gérer l’affichage du message et des confettis
	const [isScanResultVisible, setIsScanResultVisible] = useState(false);

	// Tableau de particules confettis
	const [confettiList, setConfettiList] = useState<ConfettiItem[]>([]);

	// Génère les confettis une fois au montage (ou selon votre logique)
	useEffect(() => {
		const newConfetti = generateConfetti(15); // 15 confettis
		setConfettiList(newConfetti);
	}, []);

	// Surveille la transition scanning: true -> false => affiche le résultat
	useEffect(() => {
		if (prevScanningRef.current === true && scanning === false) {
			setIsScanResultVisible(true);

			const timer = setTimeout(() => {
				setIsScanResultVisible(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
		prevScanningRef.current = scanning;
	}, [scanning]);

	// Fermer le modal de zoom
	const handleCloseModal = () => {
		setZoomedImageIndex(null);
	};

	return (
		<div className='relative min-h-screen bg-white dark:bg-gray-800 py-6 sm:py-8 lg:py-12'>
			{/** Overlay pour message + confettis si le scan est terminé */}
			{isScanResultVisible && (
				<div className='absolute top-0 left-0 z-50 flex w-full flex-col items-center mt-4'>
					<ScanSuccessMessage message='Scan terminé avec succès !' />
					{/* Conteneur confettis */}
					<div className='relative w-full h-0'>
						{confettiList.map((item, i) => (
							<span
								key={i}
								className='absolute bottom-0 block w-4 h-4 md:w-3 md:h-3 rounded-full animate-confettiFall'
								style={{ left: item.left, backgroundColor: item.color }}
							/>
						))}
					</div>
				</div>
			)}

			<motion.div
				className='grid w-full grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]'
				style={{ gridAutoFlow: 'dense' }}
				initial='hidden'
				animate='visible'
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
				}}
			>
				{images.map((image, index) => {
					const isSelected = selectedImages.has(index);
					const gridSpan = gridSpansRef.current[index];

					return (
						<motion.div
							key={index}
							className={`
                group relative cursor-pointer 
                overflow-hidden rounded-lg shadow-lg 
                ${gridSpan}
              `}
							initial={{
								borderWidth: 0,
								borderColor: 'transparent',
								borderRadius: '0px',
							}}
							animate={
								isSelected
									? {
											borderWidth: 4,
											borderColor: '#22c55e',
											borderRadius: '12px',}
									: {
											borderWidth: 0,
											borderColor: 'transparent',
											borderRadius: '0px',}
							}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							variants={{
								hidden: { opacity: 0, scale: 0.9 },
								visible: {
									opacity: 1,
									scale: 1,
									transition: { duration: 0.4 },
								},
							}}
							onClick={() => onImageSelect(index)}
						>
							{/* Image principale */}
							<motion.img
								src={image.src}
								alt={image.alt}
								className={`
                  absolute inset-0 h-full w-full object-cover 
                  transition-transform duration-300
                  ${isSelected ? 'filter grayscale opacity-50' : ''}
                `}
								whileHover={{ scale: 1.05 }}
							/>

							{/* Effet "scan" si scanning === true */}
							{scanning && (
								<div className='absolute inset-0 pointer-events-none z-10'>
									<div
										className='
                      absolute top-0 left-0 w-1/2 h-full
                      bg-gradient-to-r 
                      from-transparent via-green-500/40 to-transparent
                      animate-scanning
                    '
									/>
								</div>
							)}

							{/* Overlay sombre (optionnel) */}
							<div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50' />

							{/* Icône sélection en haut à droite */}
							<motion.div
								className={`
                  absolute top-2 right-2
                  rounded-full bg-green-700/50 p-1 text-white
                  transition-opacity duration-300
                  ${
										isSelected
											? 'opacity-100'
											: 'opacity-0 group-hover:opacity-100'
									}
                `}
								whileHover={{ scale: 1.1 }}
							>
								<CircleCheckBig className='h-6 w-6' />
							</motion.div>

							{/* Icône zoom en bas à droite */}
							<motion.div
								className='
                  absolute bottom-2 right-2
                  rounded-full bg-gray-700/50 p-1 text-white
                  opacity-0 transition-opacity duration-300
                  group-hover:opacity-100
                '
								onClick={(e) => {
									e.stopPropagation();
									setZoomedImageIndex(index);
								}}
								whileHover={{ scale: 1.1 }}
							>
								<ZoomIn className='h-6 w-6' />
							</motion.div>
						</motion.div>
					);
				})}
			</motion.div>

			{/* Modal de zoom */}
			{zoomedImageIndex !== null && (
				<ImageModal
					images={images}
					initialIndex={zoomedImageIndex}
					onClose={handleCloseModal}
					onDelete={onDelete}
					onAddToAlbum={() => null}
					onSelect={() => null}
				/>
			)}
		</div>
	);
};

export default ImageGrid;
