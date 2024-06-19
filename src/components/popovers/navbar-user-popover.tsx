import { ReactNode } from "react"

import { User } from "@/models/user"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type NavBarUserPopoverProps = {
    user?: User
    children?: ReactNode
}

export function NavBarUserPopover({ user, children }: NavBarUserPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger className="hover:bg-gray-100 transition-all size-full">
                {children}
            </PopoverTrigger>

            <PopoverContent>
                {user ? (
                    "@" + user?.username
                ) : (
                    "not authenticated"
                )}
            </PopoverContent>
        </Popover>
    )
}