import { ReactNode } from "react"

type AuthFormProps = {
    children?: ReactNode
}

export function AuthForm({ children }: AuthFormProps) {
    return (
        <div className="flex flex-col gap-5 w-[400px]">
            {children}
        </div>
    )
}