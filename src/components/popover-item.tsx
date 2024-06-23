import { ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type PopoverItemProps = {
    icon?: ElementType
    children?: ReactNode
    className?: string
    onClick?: () => void
    variant?: "default" | "destructive"
}

export function PopoverItem({ icon: Icon, children, className, onClick, variant = "default" }: PopoverItemProps) {
    return (
        <div onClick={onClick} className={twMerge("cursor-pointer flex items-center gap-3 hover:bg-gray-100 p-2 w-full h-12 transition-all", className)}>
            {Icon && (
                <div className={`flex justify-center items-center rounded-full w-8 h-full ${variant == "default" ? "bg-gray-200 text-gray-600" : "bg-destructive/20 text-destructive"}`}>
                    <Icon size={20} />
                </div>
            )}

            <span className={variant == "default" ? "text-gray-800" : "text-destructive"}>{children}</span>
        </div>
    )
}