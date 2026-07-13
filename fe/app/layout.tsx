import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'Aidnara AI',
  description: 'Transparent Aid, Verified Impact',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
