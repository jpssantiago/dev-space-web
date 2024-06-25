import { ReactNode } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type ThemeSelectorPopoverProps = {
    children?: ReactNode
    onOpen: () => void
}

export function ThemeSelectorPopover({ children, onOpen }: ThemeSelectorPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger className="w-full" onClick={onOpen}>{children}</PopoverTrigger>

            <PopoverContent align="start">
                theme
            </PopoverContent>
        </Popover>
    )
}