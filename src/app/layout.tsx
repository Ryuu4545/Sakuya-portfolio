import type { Metadata } from 'next';
import './globals.css';

/* ═══════════════════════════════════════════════════════════
   ROOT LAYOUT
   Sets up metadata, fonts, and the noise overlay wrapper.
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: 'Sakuya — Game Developer & Resonator',
  description:
    'Portfolio of Sakuya, a Mongolian game developer and Wuthering Waves enthusiast. Built with Next.js, Three.js, and a passion for gaming.',
  keywords: ['Sakuya', 'Game Developer', 'Wuthering Waves', 'Portfolio', 'Phrolova'],
  authors: [{ name: 'Sakuya' }],
  openGraph: {
    title: 'Sakuya — Game Developer & Resonator',
    description: 'Where code meets resonance.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="noise-overlay bg-void text-silver antialiased">
        {children}
      </body>
    </html>
  );
}
