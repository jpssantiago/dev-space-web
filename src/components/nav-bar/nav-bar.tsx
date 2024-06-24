import { Heart, Home, Menu, User } from "lucide-react"

import { NavBarLink } from "./nav-bar-link"
import { NavBarItem } from "./nav-bar-item"
import { NavBarUserPopover } from "../popovers/navbar-user-popover"

export function NavBar() {
    return (
        <div className="flex flex-col justify-between items-center py-5 w-16 h-screen">
            <div>
                <span>logo</span>
            </div>

            <nav className="flex flex-col gap-1">
                <NavBarLink
                    href="/app/feed"
                    icon={Home}
                />

                <NavBarLink
                    href="/app/activity"
                    icon={Heart}
                />

                <NavBarLink
                    href="/app/profile/$username$"
                    icon={User}
                />
            </nav>

            <NavBarUserPopover>
                <NavBarItem icon={Menu} />
            </NavBarUserPopover>
        </div>
    )
}