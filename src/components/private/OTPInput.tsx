import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

type OTPInputProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange, maxLength = 6 }) => {
  return (
    <InputOTP maxLength={maxLength} value={value} onChange={onChange}>
      <InputOTPGroup className="gap-2">
        {[...Array(maxLength)].map((_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className="w-12 h-12 text-lg border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};

export default OTPInput;