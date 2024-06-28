"use client"

import { ElementType } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { NavBarItem } from "./nav-bar-item"

type NavBarLinkProps = {
    href: string
    icon: ElementType
}

export function NavBarLink({ href, icon: Icon }: NavBarLinkProps) {
    const pathname = usePathname()

    const isActive = pathname == href

    return (
        <Link href={href} className="flex justify-center items-center size-16">
            <NavBarItem
                icon={Icon}
                className={isActive ? "bg-gray-200" : ""}
                iconClassName={isActive ? "text-primary" : ""}
            />
        </Link>
    )
}