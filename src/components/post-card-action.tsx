import { ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type PostCardActionProps = {
    icon: ElementType
    children?: ReactNode
    className?: string
    onClick?: () => void
}

export function PostCardAction({ icon: Icon, children, className, onClick }: PostCardActionProps) {
    return (
        <div 
            onClick={onClick}
            className={twMerge("text-sm flex justify-between items-center gap-2 hover:bg-blue-100 px-2 py-1 rounded-full dark:text-zinc-400 dark:hover:text-blue-500 dark:hover:bg-background text-gray-600 hover:text-blue-600 transition-all cursor-pointer", className)}
        >
            <Icon size={16} />

            {children && <span className="text-sm">{children}</span>}
        </div>
    )
}