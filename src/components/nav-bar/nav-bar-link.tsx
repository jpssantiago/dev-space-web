"use client"

import { ElementType } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"

type NavBarLinkProps = {
    href: string
    icon: ElementType
}

export function NavBarLink({ href, icon: Icon }: NavBarLinkProps) {
    const pathname = usePathname()

    const isActive = href == pathname

    return (
        <Link href={href} className="size-full">
            <div className="relative flex justify-center items-center bg-transparent hover:bg-gray-100 transition-all size-full">
                <Icon className={isActive ? "text-blue-500" : "text-gray-600"} />

                <div 
                    className={
                        twMerge(
                            "bottom-0 left-1/2 absolute bg-transparent w-0 h-[2px] transition-all duration-300",
                            isActive && "bg-blue-500 w-full left-0"
                        )
                    }
                />
            </div>
        </Link>
    )
}