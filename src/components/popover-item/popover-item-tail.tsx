import { ElementType } from "react"

type PopoverItemTailProps = {
    icon: ElementType
}

export function PopoverItemTail({ icon: Icon }: PopoverItemTailProps) {
    return (
        <Icon size={20} className="text-black dark:text-primary" />
    )
}