import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7b5835" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: {
    default: "Vasantham Charitable Trust - Transforming Lives Through Compassion",
    template: "%s | Vasantham Charitable Trust",
  },
  description:
    "DARPAN registered NGO in Tamil Nadu dedicated to elder care, food distribution, education, and medical services for underprivileged communities. Support our mission today.",
  keywords: [
    "NGO Tamil Nadu",
    "charity India",
    "elder care",
    "food distribution",
    "education support",
    "medical camps",
    "DARPAN registered",
    "donation",
    "volunteer",
    "rural development",
    "old age home",
    "charitable trust",
  ],
  authors: [{ name: "Vasantham Charitable Trust" }],
  creator: "Vasantham Charitable Trust",
  publisher: "Vasantham Charitable Trust",
  metadataBase: new URL("https://vasantham-trust.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vasantham Charitable Trust - Transforming Lives Through Compassion",
    description: "DARPAN registered NGO serving underprivileged communities in rural Tamil Nadu",
    url: "https://vasantham-trust.vercel.app",
    siteName: "Vasantham Charitable Trust",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vasantham Charitable Trust",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vasantham Charitable Trust",
    description: "Transforming lives through compassionate service in rural Tamil Nadu",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "Vasantham Charitable Trust",
              description: "DARPAN registered charitable trust serving underprivileged communities in rural Tamil Nadu",
              url: "https://vasantham-trust.vercel.app",
              logo: "https://vasantham-trust.vercel.app/icon.svg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tamil Nadu",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-XXXXX-XXXXX",
                contactType: "Customer Service",
                email: "vasanthamcharitabletrust82@gmail.com",
                availableLanguage: ["English", "Tamil"],
              },
              sameAs: [],
              areaServed: {
                "@type": "State",
                name: "Tamil Nadu",
              },
              knowsAbout: ["Elder Care", "Food Distribution", "Education Support", "Medical Camps"],
              nonprofitStatus: "Registered Charitable Trust",
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
