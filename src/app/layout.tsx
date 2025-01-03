import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}