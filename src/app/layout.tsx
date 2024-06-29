import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"

import { AuthProvider } from "@/contexts/auth-context"
import { UserProvider } from "@/contexts/user-context"
import { FeedProvider } from "@/contexts/feed-context"
import { PostProvider } from "@/contexts/post-context"
import { ProfileProvider } from "@/contexts/profile-context"
import { ActivityProvider } from "@/contexts/activity-context"
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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <UserProvider>
            <AuthProvider>
              <FeedProvider>
                <PostProvider>
                  <ProfileProvider>
                    <ActivityProvider>
                      <TooltipProvider>
                        {children}
                        <Toaster richColors />
                      </TooltipProvider>
                    </ActivityProvider>
                  </ProfileProvider>
                </PostProvider>
              </FeedProvider>
            </AuthProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
