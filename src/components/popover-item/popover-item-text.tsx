import { ReactNode } from "react"

type PopoverItemTextProps = {
    children?: ReactNode
}

export function PopoverItemText({ children }: PopoverItemTextProps) {
    return (
        <span className="font-medium text-black">{children}</span>
    )
}