import { isDigit } from '@/lib/helpers';
import React, { useState, useRef, useEffect } from 'react';


type OTPInputProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange, maxLength = 6 }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [maskedValue, setMaskedValue] = useState<string>('');

  // Mettre à jour la valeur masquée lorsque la valeur change
  useEffect(() => {
    setMaskedValue('•'.repeat(value.length));
  }, [value]);

  // Gérer la saisie dans chaque champ
  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Vérifier si la valeur saisie est un chiffre
    if (newValue && !isDigit(newValue)) {
      return;
    }

    if (newValue.length <= 1) {
      // Mettre à jour la valeur globale
      const newPin = value.slice(0, index) + newValue + value.slice(index + 1);
      onChange(newPin);

      // Passer au champ suivant si un caractère est saisi
      if (newValue && index < maxLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Gérer les touches du clavier (comme Backspace)
  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {[...Array(maxLength)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={maskedValue[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          className="w-12 h-12 text-lg text-center border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      ))}
    </div>
  );
};

export default OTPInput;