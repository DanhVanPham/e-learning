import type { Metadata } from 'next'
import './globals.css'
import { manrope } from '@/utils'
import Sidebar from '@/components/layout/Sidebar'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/common'

export const metadata: Metadata = {
  title: 'E-Learning',
  description: 'Nền tảng học lập trình trực tuyến',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
