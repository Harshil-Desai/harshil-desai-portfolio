import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ThemeProviderClient from './themeprovider'
import { SITE_URL, SITE_NAME, SITE_AUTHOR } from '@/lib/config'

// Configure Inter font with variable font support
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

// Configure JetBrains Mono for code
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Harshil Desai - Software Engineer',
  description: 'Software Engineer crafting elegant solutions to complex problems. Passionate about building scalable systems, clean architecture, and exceptional user experiences.',
  keywords: ['software engineer', 'full stack developer', 'web development', 'react', 'nextjs', 'typescript'],
  authors: [{ name: SITE_AUTHOR }],
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Harshil Desai - Software Engineer',
    description: 'Software Engineer crafting elegant solutions to complex problems',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harshil Desai - Software Engineer',
    description: 'Software Engineer crafting elegant solutions to complex problems',
    creator: '@harshildesai',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProviderClient>
          {children}
        </ThemeProviderClient>
      </body>
    </html>
  )
}