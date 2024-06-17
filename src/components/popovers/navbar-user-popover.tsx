import { ReactNode } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type NavBarUserPopoverProps = {
    children?: ReactNode
}

export function NavBarUserPopover({ children }: NavBarUserPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger className="hover:bg-gray-100 transition-all size-full">
                {children}
            </PopoverTrigger>

            <PopoverContent>
                user
            </PopoverContent>
        </Popover>
    )
}