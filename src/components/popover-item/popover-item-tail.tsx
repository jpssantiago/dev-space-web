import { ElementType } from "react"

type PopoverItemTailProps = {
    icon: ElementType
}

export function PopoverItemTail({ icon: Icon }: PopoverItemTailProps) {
    return (
        <Icon className="text-black" />
    )
}