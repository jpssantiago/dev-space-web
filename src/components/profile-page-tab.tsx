"use client"

import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type ProfilePageTabProps = {
    selectedTab: "posts" | "replies"
    tab: "posts" | "replies"
    onSelect: (tab: "posts" | "replies") => void
    children?: ReactNode
}

export function ProfilePageTab({ selectedTab, tab, onSelect, children }: ProfilePageTabProps) {
    const isSelected = selectedTab == tab
    
    return (
        <div 
            onClick={() => onSelect(tab)} 
            className="relative flex justify-center items-center hover:bg-gray-100 h-12 cursor-pointer"
        >
            <span className={twMerge("transition-all font-medium text-gray-400", isSelected && "text-black")}>
                {children}
            </span>

            <div 
                className={twMerge("bottom-0 left-1/2 absolute bg-black h-px w-0 transition-all duration-300", isSelected && "w-full left-0")}
            />
        </div>
    )
}