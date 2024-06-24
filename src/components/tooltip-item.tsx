import { ReactNode } from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type TooltipitemProps = {
    tooltip: string
    asChild?: boolean
    children?: ReactNode
    className?: string
    align?: "center" | "end" | "start" | undefined
}

export function TooltipItem({ tooltip, asChild, children, className, align }: TooltipitemProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild={asChild} className={className}>{children}</TooltipTrigger>

            <TooltipContent align={align}>{tooltip}</TooltipContent>
        </Tooltip>
    )
}