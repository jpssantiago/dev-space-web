import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type PopoverItemProps = {
    children?: ReactNode
    onClick?: () => void
    className?: string
}

export function PopoverItem({ children, onClick, className }: PopoverItemProps) {
    return (
        <div
            onClick={onClick} 
            className={twMerge("flex justify-between items-center dark:hover:bg-zinc-800 hover:bg-gray-100 px-3 rounded-lg w-full h-12 transition-all cursor-pointer", className)}
        >
            {children}
        </div>
    )
}