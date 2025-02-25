import React, { useState } from 'react';
import OTPInput from './OTPInput';
import { Button } from '@/components/ui/button';
import appTexts from '@/assets/appTexts.json';

type AccessPrivatePageFormProps = {
  onSubmit: (pin: string) => void;
  error?: string;
};

const AccessPrivatePageForm: React.FC<AccessPrivatePageFormProps> = ({ onSubmit, error }) => {
  const [pin, setPin] = useState('');
  const texts = appTexts.PrivatePage.AccessPrivatePageForm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pin);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
        {texts.title}
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        {texts.message}
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <OTPInput value={pin} onChange={setPin} />
        </div>
        {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
        <div className="flex justify-center gap-3">
          <Button className='w-full bg-green-800 hover:bg-green-700 text-white' type="submit">
            {texts.buttonLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccessPrivatePageForm;