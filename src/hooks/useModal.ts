import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false); // Assurez-vous que cette fonction est correcte

  return { isOpen, openModal, closeModal };
};

export default useModal;