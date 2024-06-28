import { ElementType } from "react"
import { twMerge } from "tailwind-merge"

type SelectThemeItemProps = {
    icon: ElementType
    isSelected: boolean
    onSelect: () => void
}

export function SelectThemeItem({ icon: Icon, isSelected, onSelect }: SelectThemeItemProps) {
    return (
        <div 
            onClick={onSelect} 
            className={twMerge("flex justify-center items-center rounded-xl size-full cursor-pointer border border-transparent", isSelected && "bg-gray-100 border-gray-300 dark:bg-background dark:border-border")}
        >
            <Icon size={20} className={twMerge("text-gray-400", isSelected && "text-black dark:text-primary")} />
        </div>
    )
}