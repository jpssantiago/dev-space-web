"use client"

import { ReactNode, useEffect } from "react"

import { useUser } from "@/contexts/user-context"
import { NavBar } from "@/components/nav-bar/nav-bar"
import { LoadingContainer } from "@/components/loading-container"

type AppLayoutProps = {
    children?: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { user, loadUser } = useUser()

    const isLoading = !user

    useEffect(() => {
        if (!user) {
            loadUser()
        }
    }, [loadUser, user])

    return (
        <div className="flex flex-col w-full min-h-screen">
            {isLoading && (
                <div className="h-screen">
                    <LoadingContainer />
                </div>
            )}

            {!isLoading && (
                <div className="flex flex-col mx-auto border-r border-l w-full max-w-[598px] h-full">
                    <NavBar />
                    {children}
                </div>
            )}
        </div>
    )
}