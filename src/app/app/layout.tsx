"use client"

import { ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"

import { NavBar } from "@/components/nav-bar/nav-bar"
import { loadUser } from "@/services/user-service"
import { LoadingContainer } from "@/components/loading-container"

type AppLayoutProps = {
    children?: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: loadUser
    })

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