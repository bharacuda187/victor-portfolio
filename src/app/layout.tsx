import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://victortansingco.com'),

  title: {
    default: 'Victor Tan Singco | Web Developer & IT Systems',
    template: '%s | Victor Tan Singco',
  },

  description:
    'Portfolio of Victor Tan Singco — Web Developer, IT Systems Specialist, and Digital Solutions Developer. Explore web development, game development, AI experiments, and digital systems.',

  keywords: [
    'Victor Tan Singco',
    'Web Developer',
    'Web Development',
    'IT Systems',
    'IT Specialist',
    'Digital Solutions',
    'Next.js',
    'React',
    'PHP',
    'Laravel',
    'Game Development',
    'Freelance Web Developer',
  ],

  authors: [
    {
      name: 'Victor Tan Singco',
    },
  ],

  creator: 'Victor Tan Singco',

  openGraph: {
    title: 'Victor Tan Singco | Web Developer & IT Systems',
    description:
      'Web development, IT systems, digital solutions, game development, and experimental technology.',
    url: 'https://victortansingco.com',
    siteName: 'Victor Tan Singco',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Victor Tan Singco | Web Developer & IT Systems',
    description:
      'Portfolio of Victor Tan Singco — Web Developer, IT Systems Specialist, and Digital Solutions Developer.',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
