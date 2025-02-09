'use client';

import React from 'react';
import appTexts from '@/assets/appTexts.json';

type CameraModalProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
  onClose: () => void;
  onCapture: () => void; // Action de capture
};

const CameraModal: React.FC<CameraModalProps> = ({ videoRef, onClose, onCapture }) => {
  const texts = appTexts.cameraModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative p-4 bg-white rounded shadow-lg w-4/5 max-w-md">
        <video
          ref={videoRef}
          className="w-full h-64 bg-black"
          autoPlay
          playsInline
          muted
        />
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {texts.closeButton}
          </button>
          <button
            onClick={onCapture}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {texts.captureButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
