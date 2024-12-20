'use client';

import React from 'react';
import localFont from 'next/font/local';
import './globals.css';

const robotoSans = localFont({
  src: './fonts/RobotoFlex.ttf',
  variable: '--font-roboto-sans',
  weight: '100 900',
});
const robotoMono = localFont({
  src: './fonts/RobotoMono.ttf',
  variable: '--font-roboto-mono',
  weight: '100 900',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
