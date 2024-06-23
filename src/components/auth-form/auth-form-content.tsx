import { ReactNode } from "react"
import { UseFormHandleSubmit } from "react-hook-form"

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