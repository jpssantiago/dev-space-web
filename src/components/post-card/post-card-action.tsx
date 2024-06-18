import { ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type PostCardActionProps = {
    icon: ElementType
    className?: string
    children?: ReactNode
}

export function PostCardAction({ icon: Icon, className, children }: PostCardActionProps) {
    return (
        <div className="flex justify-start items-center group">
            <div className={twMerge("text-gray-600 p-2 rounded-full bg-transparent transition-all", className)}>
                <Icon 
                    size={16} 
                />
            </div>

            <span className="text-xs">
                {children}
            </span>
        </div>
    )
}