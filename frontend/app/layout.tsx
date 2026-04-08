// app/layout.tsx

import "./globals.css"; // This should be the correct path

// app/layout.tsx
import type { Metadata, Viewport } from 'next'
//import { BATCLIMLocalBusinessSchema } from '@/components/LocalBusinessSchema'

export const metadata: Metadata = {
  metadataBase: new URL('https://batclim.vercel.app'),
  title: {
    default: 'BATCLIM | Solutions de Refroidissement Industriel | Algérie',
    template: '%s | BATCLIM Algérie'
  },
  description: 'BATCLIM: Leader en systèmes de refroidissement industriel en Algérie. Chambres froides, refroidisseurs multitubulaires avec garantie 1 an. Installation et maintenance à Alger, Oran, Constantine, Annaba.',
  keywords: [
    'refroidissement industriel Algérie',
    'chambres froides Alger',
    'refroidisseurs multitubulaires',
    'climatisation industrielle Oran',
    'groupes froids Constantine',
    'froid industriel Annaba',
    'BATCLIM Algérie',
    'installation chambres froides',
    'maintenance frigorifique',
    'équipements de réfrigération'
  ],
  authors: [{ name: 'BATCLIM', url: 'https://batclim.vercel.app' }],
  creator: 'BATCLIM',
  publisher: 'BATCLIM Industrial Cooling Systems',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'BATCLIM - Refroidissement Industriel en Algérie',
    description: 'Solutions professionnelles de refroidissement industriel avec garantie 1 an. Chambres froides, refroidisseurs multitubulaires. Service à travers toute l\'Algérie.',
    url: 'https://batclim.vercel.app',
    siteName: 'BATCLIM',
    images: [
      {
        url: '/images/og-algeria.jpg',
        width: 1200,
        height: 630,
        alt: 'BATCLIM Solutions de Refroidissement Industriel Algérie',
      }
    ],
    locale: 'fr_DZ',
    alternateLocale: ['ar_DZ'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BATCLIM | Refroidissement Industriel Algérie',
    description: 'Solutions de refroidissement industriel avec garantie 1 an',
    images: ['/images/twitter-card.jpg'],
    site: '@batclim',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: 'https://batclim.vercel.app',
    
  },
  category: 'industrial cooling',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e40af',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <head>
        
        
      </head>
      <body>{children}</body>
    </html>
  );
}