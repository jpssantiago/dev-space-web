import { ReactNode } from "react"

type AuthFormTitleProps = {
    children?: ReactNode
}

export function AuthFormTitle({ children }: AuthFormTitleProps) {
    return (
        <span className="font-semibold text-2xl">{children}</span>
    )
}