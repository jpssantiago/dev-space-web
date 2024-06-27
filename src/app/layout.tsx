import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { AuthProvider } from "@/contexts/auth-context"
import { UserProvider } from "@/contexts/user-context"
import { FeedProvider } from "@/contexts/feed-context"
import { PostProvider } from "@/contexts/post-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"
import { ProfileProvider } from "@/contexts/profile-context"

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
          <AuthProvider>
            <FeedProvider>
              <PostProvider>
                <ProfileProvider>
                  <TooltipProvider>
                    {children}
                    <Toaster richColors />
                  </TooltipProvider>
                </ProfileProvider>
              </PostProvider>
            </FeedProvider>
          </AuthProvider>
        </UserProvider>
      </body>
    </html>
  )
}
