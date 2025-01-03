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

  openGraph: {
    title: "Project Ideas",
    description: "An app that generates project ideas based on user preferences with customizable filters.",  
    url: "https://project-ideas-nine.vercel.app/",
    siteName: "Project Ideas",
    images: [
      {
        url:"/open-graph.png", // image link
        width: 1200,
        height: 500,
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
    images: ["/open-graph.png"],
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