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
        <div className="top-0 medium:top-auto phone:top-auto medium:bottom-0 phone:bottom-0 left-0 medium:left-0 phone:left-0 medium:z-50 phone:z-50 medium:fixed phone:fixed sticky flex medium:flex-row phone:flex-row flex-col justify-between medium:justify-center phone:justify-center items-center medium:bg-background phone:bg-background medium:opacity-[95%] phone:opacity-[95%] py-5 medium:border-t phone:border-t w-16 medium:w-full phone:w-full h-screen medium:h-16 phone:h-16">
            <div className="medium:hidden phone:hidden">
                <span>logo</span>
            </div>

            <nav className="flex medium:flex-row phone:flex-row flex-col gap-1 medium:w-full phone:w-full">
                <TooltipItem tooltip="Feed" align="center" className="medium:flex phone:flex medium:justify-center phone:justify-center medium:items-center phone:items-center w-fit medium:w-full phone:w-full">
                    <NavBarLink
                        href="/feed"
                        icon={Home}
                    />
                </TooltipItem>

                {user && (
                    <>
                        <TooltipItem tooltip="Activity" align="center" className="medium:flex phone:flex medium:justify-center phone:justify-center medium:items-center phone:items-center w-fit medium:w-full phone:w-full">
                            <div className="relative">
                                <NavBarLink
                                    href="/activity"
                                    icon={Heart}
                                />

                                {(user?.activities.filter(activity => !activity.hasBeenRead) ?? []).length > 0 && (
                                    <div className="top-5 right-5 absolute bg-destructive dark:bg-red-600 rounded-full size-2" />
                                )}
                            </div>
                        </TooltipItem>

                        <TooltipItem tooltip="Profile" align="center" className="medium:flex phone:flex medium:justify-center phone:justify-center medium:items-center phone:items-center w-fit medium:w-full phone:w-full">
                            <NavBarLink
                                href={`/profile/${user?.username}`}
                                icon={User}
                            />
                        </TooltipItem>
                    </>
                )}


                <div className="medium:flex phone:flex justify-center items-center hidden medium:w-full phone:w-full">
                    <NavBarUserPopover>
                        <NavBarItem icon={Menu} />
                    </NavBarUserPopover>
                </div>
            </nav>

            <div className="medium:hidden phone:hidden">
                <NavBarUserPopover>
                    <NavBarItem icon={Menu} />
                </NavBarUserPopover>
            </div>
        </div>
    )
}