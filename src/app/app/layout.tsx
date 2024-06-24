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
        <div className="flex bg-gray-50">
            <NavBar />

            <div className="flex flex-col mx-auto w-full max-w-[638px] -translate-x-8">
                <PageHeader />

                <div className="flex flex-col bg-white border rounded-tl-3xl rounded-tr-3xl h-[calc(100vh-48px)]">
                    {children}
                </div>
            </div>
        </div>
    )
}