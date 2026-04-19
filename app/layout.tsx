import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '../redux/provider';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YASH HOSPITAL | Premium Healthcare System',
  description: 'Book appointments with top specialists at Yash Hospital. Secure, fast, and professional medical care.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          <main className="container">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
