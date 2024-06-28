"use client"

import { useState, ReactNode, useEffect } from "react"

import { useUser } from "@/contexts/user-context"
import { NavBar } from "@/components/nav-bar/nav-bar"
import { LoadingContainer } from "@/components/loading-container"
import { PageHeader } from "@/components/page-header"

type AppLayoutProps = {
    children?: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    const [loading, setLoading] = useState<boolean>(true)

    const { user, loadUser } = useUser()

    useEffect(() => {
        if (!user) {
            loadUser().then(() => setLoading(false))
        }
    }, [])

    if (loading) {
        return (
            <div className="flex bg-gray-50 w-full h-screen">
                <LoadingContainer />
            </div>
        )
    }

    return (
        <div className="flex bg-gray-50 dark:bg-[#0A0A0A] size-full">
            <NavBar />

            <div className="flex flex-col mx-auto max-w-[638px] -translate-x-8 size-full">
                <PageHeader />

                <div className="flex flex-col bg-white dark:bg-background border rounded-tl-3xl rounded-tr-3xl w-full min-h-[calc(100vh-48px)]">
                    {children}
                </div>
            </div>
        </div>
    )
}