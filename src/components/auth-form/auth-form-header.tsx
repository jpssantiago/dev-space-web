import { ReactNode } from "react"

type AuthFormHeaderProps = {
    children?: ReactNode
}

export function AuthFormHeader({ children }: AuthFormHeaderProps) {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}