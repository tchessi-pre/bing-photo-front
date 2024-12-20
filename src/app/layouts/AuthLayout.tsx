'use client';

import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      {/* <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md"> */}
        {children}
      {/* </div> */}
    </div>
  );
};

export default AuthLayout;
