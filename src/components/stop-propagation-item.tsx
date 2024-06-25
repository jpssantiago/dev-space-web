import { ReactNode } from "react"

type StopPropagationItemProps = {
    children?: ReactNode
    className?: string
}

export function StopPropagationItem({ children, className }: StopPropagationItemProps) {
    return (
        <span onClick={e => e.stopPropagation()} className={className}>
            {children}
        </span>
    )
}