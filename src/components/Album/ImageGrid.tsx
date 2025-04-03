'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CircleCheckBig, ZoomIn } from 'lucide-react';

import ImageModal from '@/components/customs/ImageModal';
import { getRandomGridSpan } from '@/lib/gridUtils';
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
	color: string;
	translateX: number;
	translateY: number;
	size: number;
}

/**
 * Génère un certain nombre de confettis partant du centre,
 * avec une position finale aléatoire autour du centre,
 * et une taille aléatoire (ici 8 à 15 px).
 */
function generateExplosionConfetti(count = 40): ConfettiItem[] {
	const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
	const confetti: ConfettiItem[] = [];

	for (let i = 0; i < count; i++) {
		// Angle aléatoire (0 -> 2π)
		const angle = Math.random() * 2 * Math.PI;
		// Distance (rayon) aléatoire (ex: 150 à 250 px)
		const distance = 150 + Math.random() * 100;

		// Couleur prise au hasard
		const color = colors[Math.floor(Math.random() * colors.length)];

		// Conversion angle + distance -> coordonnées X/Y
		const translateX = Math.cos(angle) * distance;
		const translateY = Math.sin(angle) * distance;

		// Taille aléatoire entre 8 et 15 px
		const size = 8 + Math.random() * 7;

		confetti.push({
			color,
			translateX,
			translateY,
			size,
		});
	}

	return confetti;
}

const ImageGrid: React.FC<ImageGridProps> = ({
	images,
	selectedImages,
	onImageSelect,
	onDelete,
	scanning = false,
}) => {
	// État pour le zoom d'image
	const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);

	// On stocke les "span" aléatoires pour effet mosaïque
	const gridSpansRef = useRef<string[]>(images.map(() => getRandomGridSpan()));

	// Permet de détecter la fin du scanning (transition true -> false)
	const prevScanningRef = useRef(scanning);

	// Gère l'affichage du message + confettis
	const [isScanResultVisible, setIsScanResultVisible] = useState(false);

	// Tableau d'objets pour chaque confetti
	const [confettiList, setConfettiList] = useState<ConfettiItem[]>([]);

	useEffect(() => {
		// Quand on passe de scanning=true à scanning=false, on lance l'explosion
		if (prevScanningRef.current === true && scanning === false) {
			setIsScanResultVisible(true);

			// On génère un lot de 40 confettis
			const newConfetti = generateExplosionConfetti(80);
			setConfettiList(newConfetti);

			// Disparition après 3s
			const timer = setTimeout(() => {
				setIsScanResultVisible(false);
				setConfettiList([]);
			}, 3000);

			return () => clearTimeout(timer);
		}
		prevScanningRef.current = scanning;
	}, [scanning]);

	// Fermer la modale de zoom
	const handleCloseModal = () => {
		setZoomedImageIndex(null);
	};

	return (
		<div className='relative min-h-screen bg-white dark:bg-gray-800 py-6 sm:py-8 lg:py-12'>
			{/* Overlay pour message + explosion de confettis */}
			{isScanResultVisible && (
				<div className='fixed inset-0 z-50 flex flex-col items-center justify-center'>
					<ScanSuccessMessage message='Scan terminé avec succès !' />
					<div
						className='pointer-events-none fixed'
						style={{
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						{/* Chaque confetti en position absolute dans ce conteneur fixed */}
						{confettiList.map((item, i) => (
							<span
								key={i}
								className='absolute block rounded-full animate-confettiExplosion'
								style={{
									backgroundColor: item.color,
									width: `${item.size}px`,
									height: `${item.size}px`,
									'--x': `${item.translateX}px`,
									'--y': `${item.translateY}px`,
								} as React.CSSProperties}
							/>
						))}
					</div>
				</div>
			)}

			<motion.div
				className='grid w-full gap-2 sm:gap-3 md:gap-4
					grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
					auto-rows-[200px] sm:auto-rows-[180px] md:auto-rows-[200px]'
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
										borderRadius: '12px',
									}
									: {
										borderWidth: 0,
										borderColor: 'transparent',
										borderRadius: '0px',
									}
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
                  ${isSelected
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
