import React from 'react';

type PermissionDeniedModalProps = {
  onClose: () => void;
};

const PermissionDeniedModal: React.FC<PermissionDeniedModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
    <div className="p-4 bg-white rounded shadow-lg text-center">
      <p className="text-red-600 font-bold">Accès à la caméra refusé</p>
      <p className="mt-2 text-gray-600">Veuillez vérifier vos paramètres et réessayer.</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        OK
      </button>
    </div>
  </div>
);

export default PermissionDeniedModal;
