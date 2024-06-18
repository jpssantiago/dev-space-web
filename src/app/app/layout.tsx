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
        <div className="flex flex-col gap-5 bg-gray-100 w-full h-screen">
            {isLoading && <LoadingContainer />}

            {!isLoading && (
                <>
                    <NavBar />
                    {children}
                </>
            )}
        </div>
    )
}