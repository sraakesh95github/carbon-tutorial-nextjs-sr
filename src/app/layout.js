import './globals.scss';

import { Providers } from './providers';

export const metadata = {
  title: 'Ford Demo',
  description: 'Ford Signal Integrity Verification Demo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
