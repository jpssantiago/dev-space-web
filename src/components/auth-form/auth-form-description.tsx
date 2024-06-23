import { ReactNode } from "react"

type AuthFormDescriptionProps = {
    children?: ReactNode
}

export function AuthFormDescription({ children }: AuthFormDescriptionProps) {
    return (
        <span>{children}</span>
    )
}