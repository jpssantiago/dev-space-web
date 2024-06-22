"use client"

import { ReactNode } from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { twMerge } from "tailwind-merge"

type TooltipItemProps = {
    tooltip: string
    children?: ReactNode
    className?: string
    asChild?: boolean
}

export function TooltipItem({ tooltip, children, className, asChild = false }: TooltipItemProps) {
    return (
        <div onClick={e => e.stopPropagation()}>
            <Tooltip>
                <TooltipTrigger className={twMerge("cursor-default", className)} asChild={asChild}>
                    {children}
                </TooltipTrigger>

                <TooltipContent>
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        </div>
    )
}