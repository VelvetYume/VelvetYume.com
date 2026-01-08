// app/metadata.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VelvetYume',
  description: 'Anime ve görsel roman çevirileri',
  keywords: 'anime, visual novel, çeviri, oyun, rpgm, 18+',
  authors: [{ name: 'VelvetYume' }],
  openGraph: {
    title: 'VelvetYume',
    description: 'Karanlık, tutkulu ve gizemli çeviriler',
    url: 'https://velvetyume.com',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg', // OG image ekle
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VelvetYume',
    description: 'Anime ve görsel roman çevirileri',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};