import { ReactNode } from "react"

type NavBarActionProps = {
    children?: ReactNode
}

export function NavBarAction({ children }: NavBarActionProps) {
    return (
        <div className="flex justify-center items-center size-full">
            {children}
        </div>
    )
}