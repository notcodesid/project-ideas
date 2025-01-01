import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-toggle"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Project Ideas",
  description: "An app that generates project ideas based on user preferences with customizable filters.",

  // Open Graph metadata
  openGraph: {
    title: "Project Ideas",
    description: "An app that generates project ideas based on user preferences with customizable filters.",  
    url: "https://project-ideas-theta.vercel.app/",
    siteName: "Project Ideas",
    images: [
      {
        url:"/open-graph-updated.png", // updated image link
        width: 1080,
        height: 1080,
        alt: "Title with their description",
      },
    ],
    locale: "en_US",
    type: "article",
  },

  twitter: {
    card: "summary_large_image",
    title: "Project Ideas",
    description: "An app that generates project ideas based on user preferences with customizable filters.",  
    images: ["/open-graph-updated.png"], // updated image link
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}