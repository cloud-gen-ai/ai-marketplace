import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Marketplace | Skills, courses, and human guidance for building with AI',
  description: 'Discover reusable AI skills, practical courses, one-to-one mentoring, and project guidance for modern AI work.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
