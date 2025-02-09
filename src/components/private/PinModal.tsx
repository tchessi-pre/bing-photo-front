import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OTPInput from './OTPInput';
import appTexts from '@/assets/appTexts.json';

type PinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
};

const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const texts = appTexts.PrivatePage.PinModal;

  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification que les PINs ont 6 chiffres
    if (pin.length !== 6 || confirmPin.length !== 6) {
      setError(texts.errorMessages.invalidLength);
      return;
    }

    // Vérification que les deux PINs correspondent
    if (pin !== confirmPin) {
      setError(texts.errorMessages.mismatch);
      return;
    }

    // Enregistre le PIN et signale le succès
    localStorage.setItem('privatePin', pin);
    onSubmit(pin);
    setIsConfirmed(true);
    setError('');

    // Refermer la modale après un délai
    setTimeout(() => {
      onClose();
      setIsConfirmed(false);
    }, 2000);
  };

  // Réinitialise l’état lorsqu’on ouvre la modale
  useEffect(() => {
    if (isOpen) {
      setIsConfirmed(false);
      setPin('');
      setConfirmPin('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-white p-8 rounded-lg shadow-xl w-96"
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            {isConfirmed ? texts.successTitle : texts.title}
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            {isConfirmed ? texts.successMessage : texts.instruction}
          </p>

          {isConfirmed ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-lg text-gray-700 text-center">{texts.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.label}
                  </label>
                  <OTPInput value={pin} onChange={setPin} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.confirmationLabel}
                  </label>
                  <OTPInput value={confirmPin} onChange={setConfirmPin} />
                </div>
              </div>
              {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {texts.buttonLabels.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {texts.buttonLabels.submit}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PinModal;
