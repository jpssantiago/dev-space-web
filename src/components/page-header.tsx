"use client"

import { usePathname } from "next/navigation"
import { useUser } from "@/contexts/user-context"

export function PageHeader() {
    const pathname = usePathname()
    const { user } = useUser()

    const username = pathname.split("/profile/")[1]

    return (
        <div className="top-0 z-50 sticky flex justify-center items-center bg-gray-50 w-full h-12">
            <span className="font-semibold text-base">
                {pathname == "/app/feed" && "Feed"}
                {pathname == "/app/activity" && "Activity"}
                {pathname.includes("/app/profile") && (
                    <>
                        {username == user?.username ? "Your profile" : username}
                    </>
                )}
            </span>
        </div>
    )
}