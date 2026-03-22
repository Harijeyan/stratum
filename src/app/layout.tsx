import type { Metadata } from 'next'
import { DM_Sans, DM_Mono, Syne, Instrument_Serif } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400', '500'],
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Stratum — Ship data like you ship code',
  description:
    'Stratum gives data teams version control, CI/CD, and observability for their pipelines. Stop debugging in production.',
  openGraph: {
    title: 'Stratum — Ship data like you ship code',
    description:
      'Version control, CI/CD, and observability for your data pipelines.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${syne.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
