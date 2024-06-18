import { ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type PostCardActionProps = {
    icon: ElementType
    backgroundHover?: string
    iconClassName?: string
    textHover?: string
    children?: ReactNode
}

export function PostCardAction({ icon: Icon, backgroundHover = "hover:bg-blue-100", iconClassName, textHover = "group-hover:text-blue-500", children }: PostCardActionProps) {
    return (
        <div className={twMerge("flex items-center bg-transparent gap-2 px-2 py-1 rounded-full h-6 transition-all group", backgroundHover)}>
            <Icon size={16} className={twMerge("transition-all text-gray-600", textHover, iconClassName)} />
            <span className={twMerge("text-sm transition-all text-gray-600", textHover)}>{children}</span>
        </div>
    )
}