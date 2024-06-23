import { ReactNode } from "react"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

type UnderlineLinkProps = {
    href: string
    children?: ReactNode
    className?: string
}

export function UnderlineLink({ href, children, className }: UnderlineLinkProps) {
    return (
        <Link
            href={href}
            className={twMerge("border-b border-b-transparent hover:border-b-blue-500 w-fit text-blue-500 text-sm transition-all", className)}
        >
            {children}
        </Link>
    )
}