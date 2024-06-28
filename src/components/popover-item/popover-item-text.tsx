import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type PopoverItemTextProps = {
    children?: ReactNode
    className?: string
}

export function PopoverItemText({ children, className }: PopoverItemTextProps) {
    return (
        <span className={twMerge("font-medium text-black dark:text-primary", className)}>{children}</span>
    )
}