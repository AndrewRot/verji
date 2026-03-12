import './globals.css';
import Header from '@/components/Header';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata = {
  title: 'Verji - A Premium Verjus Beverage',
  description: 'Experience Verji, an elegant, non-alcoholic alternative to wine, crafted from the finest unripe grapes. Perfect for any occasion.',
  openGraph: {
    title: 'Verji - A Premium Verjus Beverage',
    description: 'Experience Verji, an elegant, non-alcoholic alternative to wine.',
    url: 'https://verji.club', // Replace with your actual domain (Old 'https://verji.vercel.app')
    siteName: 'Verji',
    images: [
      {
        url: '/og-image.jpg', // Create and add an OG image to the public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        {children}
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
