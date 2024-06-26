/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { FC, PropsWithChildren } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Next.js ABC Web Components App',
  description: 'This Next.js App demonstrates how to use the ABC Web Components.',
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  await import('abc-web-components-react-wrapper/server');

  return (
    <html lang="en" className={inter.className}>
      <body
        style={{
          width: '60rem',
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      >
        <noscript>Please enable JavaScript to view this website. Especially if you use Firefox.</noscript>
        {children}
        <Script src="/scripts/polyfills/template-shadowroot.loader.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
};

export default RootLayout;
