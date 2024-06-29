import { ReactNode } from "react"

type AuthFormContentProps = {
    onSubmit: () => void
    children?: ReactNode
}

export function AuthFormContent({ onSubmit, children }: AuthFormContentProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {children}
        </form>
    )
}