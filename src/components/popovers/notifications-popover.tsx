import { ReactNode } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type NotificationsPopoverProps = {
    children?: ReactNode
}

export function NotificationsPopover({ children }: NotificationsPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger className="hover:bg-gray-100 transition-all size-full">
                {children}
            </PopoverTrigger>

            <PopoverContent>
                notifications
            </PopoverContent>
        </Popover>
    )
}