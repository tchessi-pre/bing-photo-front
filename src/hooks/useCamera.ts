import { useRef, useState } from 'react';

export const useCamera = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const openCamera = async () => {
    try {
      console.log('Recherche des périphériques caméra...');
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      if (videoDevices.length === 0) {
        throw new Error('Aucun périphérique caméra détecté.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: videoDevices[0].deviceId },
      });

      console.log('Flux vidéo reçu :', stream);
      setPermissionDenied(false);
      setIsCameraOpen(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Erreur lors de l’ouverture de la caméra :', error);
      setPermissionDenied(true);
    }
  };



  const closeCamera = () => {
    setIsCameraOpen(false);
    setPhoto(null);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const image = canvas.toDataURL('image/png'); // Convertir l'image en base64
      setPhoto(image); // Stocker la photo
      console.log('Photo capturée :', image);
    }
  };

  return {
    isCameraOpen,
    permissionDenied,
    setPermissionDenied,
    openCamera,
    closeCamera,
    capturePhoto,
    photo,
    videoRef,
  };
};

