"use client"

import { Heart, Home, Menu, User } from "lucide-react"

import { useUser } from "@/contexts/user-context"
import { NavBarLink } from "./nav-bar-link"
import { NavBarItem } from "./nav-bar-item"
import { NavBarUserPopover } from "../popovers/navbar-user-popover"
import { TooltipItem } from "../tooltip-item"

export function NavBar() {
    const { user } = useUser()

    return (
        <div className="top-0 left-0 sticky flex flex-col justify-between items-center py-5 w-16 h-screen">
            <div>
                <span>logo</span>
            </div>

            <nav className="flex flex-col gap-1">
                <TooltipItem tooltip="Feed" align="end" className="w-fit">
                    <NavBarLink
                        href="/app/feed"
                        icon={Home}
                    />
                </TooltipItem>

                <TooltipItem tooltip="Activity" align="end" className="w-fit">
                    <NavBarLink
                        href="/app/activity"
                        icon={Heart}
                    />
                </TooltipItem>

                <TooltipItem tooltip="Profile" align="end" className="w-fit">
                    <NavBarLink
                        href={`/app/profile/${user?.username}`}
                        icon={User}
                    />
                </TooltipItem>
            </nav>

            <NavBarUserPopover>
                <NavBarItem icon={Menu} />
            </NavBarUserPopover>
        </div>
    )
}