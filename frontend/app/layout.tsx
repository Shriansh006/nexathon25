import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Import React
import {Toaster} from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "manimBook - Mathematical Animations Made Easy",
  description: "Create stunning mathematical animations with manimBook",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
            position="bottom-center"
            reverseOrder={false}
          />
          {children}
        </body>
    </html>
  )
}

