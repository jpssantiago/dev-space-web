"use client"

import { useState, ReactNode, useEffect } from "react"

import { useUser } from "@/contexts/user-context"
import { NavBar } from "@/components/nav-bar/nav-bar"
import { LoadingContainer } from "@/components/loading-container"

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

    return (
        <div className="flex flex-col w-full min-h-screen">
            {loading && (
                <div className="h-screen">
                    <LoadingContainer />
                </div>
            )}

            {!loading && (
                <div className="flex flex-col mx-auto border-r border-l w-full max-w-[598px] h-full">
                    <NavBar />
                    {children}
                </div>
            )}
        </div>
    )
}