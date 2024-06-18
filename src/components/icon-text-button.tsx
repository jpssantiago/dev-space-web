import { ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

import { Button, ButtonProps } from "@/components/ui/button"

type IconTextButtonProps = ButtonProps & {
    icon: ElementType
    children?: ReactNode
    className?: string
}

export function IconTextButton({ icon: Icon, children, className, ...rest }: IconTextButtonProps) {
    return (
        <Button className={twMerge("flex items-center gap-2", className)} {...rest}>
            <Icon size={20} />
            {children}
        </Button>
    )
}