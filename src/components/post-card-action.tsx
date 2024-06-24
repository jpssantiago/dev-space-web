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
            className={twMerge("flex justify-between items-center gap-2 hover:bg-blue-100 px-2 py-1 rounded-full text-gray-600 hover:text-blue-500 transition-all cursor-pointer", className)}
        >
            <Icon size={16} />

            {children && <span className="text-sm">{children}</span>}
        </div>
    )
}