import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Dancing_Script } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing',
});

export const metadata: Metadata = {
  title: 'A Little Surprise ❤️',
  description: 'Someone made something special just for you...',
  openGraph: {
    title: 'A Little Surprise ❤️',
    description: 'Someone made something special just for you...',
    images: ['https://images.pexels.com/photos/1239388/pexels-photo-1239388.jpeg?auto=compress&cs=tinysrgb&w=800'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${dancing.variable}`}>
      <body className="font-poppins antialiased">{children}</body>
    </html>
  );
}
