import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { UserProvider } from "@/contexts/user-context"
import { FeedProvider } from "@/contexts/feed-context"
import { PostProvider } from "@/contexts/post-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevSpace",
  description: "Welcome to DevSpace",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <FeedProvider>
            <PostProvider>
              <TooltipProvider>
                {children}
                <Toaster richColors />
              </TooltipProvider>
            </PostProvider>
          </FeedProvider>
        </UserProvider>
      </body>
    </html>
  )
}
