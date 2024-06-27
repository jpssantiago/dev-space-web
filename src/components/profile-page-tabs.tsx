import { ReactNode } from "react"

type ProfilePageTabsProps = {
    children?: ReactNode
}

export function ProfilePageTabs({ children }: ProfilePageTabsProps) {
    return (
        <div className="grid grid-cols-2 border-b w-full">
            {children}
        </div>
    )
}