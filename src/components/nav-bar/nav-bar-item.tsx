import { ElementType } from "react"
import { twMerge } from "tailwind-merge"

type NavBarItemProps = {
    icon: ElementType
    className?: string
    iconClassName?: string
}

export function NavBarItem({ icon: Icon, className, iconClassName }: NavBarItemProps) {
    return (
        <div className={twMerge("cursor-pointer flex justify-center items-center hover:bg-gray-200 rounded-lg transition-all duration-200 group size-12", className)}>
            <Icon className={twMerge("group-hover:text-primary text-gray-400 transition-all", iconClassName)} />
        </div>
    )
}