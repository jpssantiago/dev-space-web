import { ReactNode } from "react"

type PopoverItemProps = {
    children?: ReactNode
    onClick?: () => void
}

export function PopoverItem({ children, onClick }: PopoverItemProps) {
    return (
        <div
            onClick={onClick} 
            className="flex justify-between items-center hover:bg-gray-100 px-3 rounded-lg w-full h-12 transition-all cursor-pointer"
        >
            {children}
        </div>
    )
}