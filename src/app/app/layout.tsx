import { ReactNode } from "react"

import { NavBar } from "@/components/nav-bar/nav-bar"

type AppLayoutProps = {
    children?: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex flex-col gap-5 bg-gray-100 w-full h-screen">
            <NavBar />
            {children}
        </div>
    )
}