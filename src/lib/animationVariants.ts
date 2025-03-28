import { Variant } from 'framer-motion';

export const containerVariants: { [key: string]: Variant } = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const itemVariants: { [key: string]: Variant } = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120
    }
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};