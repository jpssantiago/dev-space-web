"use client"

import { Bell, Home, MessageCircle, User } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { LoadUserResponse } from "@/responses/user-responses"
import { NavBarLink } from "./nav-bar-link"
import { NavBarAction } from "./nav-bar-action"
import { UserAvatar } from "@/components/user-avatar"
import { NotificationsPopover } from "../popovers/notifications-popover"
import { NavBarUserPopover } from "../popovers/navbar-user-popover"

export function NavBar() {
    const { data: response } = useQuery<LoadUserResponse>({ queryKey: ["user"] })

    return (
        <div className="flex justify-center items-center bg-white border-b w-full h-14">
            <div className="flex w-full h-full">
                <NavBarLink icon={Home} href="/app/feed" />

                <NavBarLink icon={MessageCircle} href="/app/chat" />

                <NavBarLink icon={User} href="/app/profile" />

                <NotificationsPopover>
                    <NavBarAction>
                        <Bell className="text-gray-600" />
                    </NavBarAction>
                </NotificationsPopover>

                <NavBarUserPopover>
                    <NavBarAction>
                        <UserAvatar user={response && response.user} className="size-8" />
                    </NavBarAction>
                </NavBarUserPopover>
            </div>
        </div>
    )
}