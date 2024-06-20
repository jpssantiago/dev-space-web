"use client"

import { Bell, Home, MessageCircle } from "lucide-react"

import { useUser } from "@/contexts/user-context"
import { NavBarLink } from "./nav-bar-link"
import { NavBarAction } from "./nav-bar-action"
import { UserAvatar } from "@/components/user-avatar"
import { NavBarUserPopover } from "../popovers/navbar-user-popover"

export function NavBar() {
    const { user } = useUser()

    return (
        <div className="flex justify-center items-center bg-white border-t border-b w-full h-14">
            <div className="flex w-full h-full">
                <NavBarLink icon={Home} href="/app/feed" />

                <NavBarLink icon={MessageCircle} href="/app/chat" />

                <NavBarLink icon={Bell} href="/app/notifications" />

                <NavBarUserPopover user={user}>
                    <NavBarAction>
                        <UserAvatar user={user} className="size-8" />
                    </NavBarAction>
                </NavBarUserPopover>
            </div>
        </div>
    )
}