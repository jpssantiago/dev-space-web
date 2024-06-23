"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { BookUser, LogIn, LogOut, UserPlus } from "lucide-react"
import { toast } from "sonner"

import { User } from "@/models/user"
import { useAuth } from "@/contexts/auth-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverItem } from "@/components/popover-item"
import { PopoverClose } from "@radix-ui/react-popover"

type NavBarUserPopoverProps = {
    user?: User
    children?: ReactNode
}

export function NavBarUserPopover({ user, children }: NavBarUserPopoverProps) {
    const { signOut } = useAuth()

    function handleSignOut() {
        signOut()
        toast.success("You are no longer authenticated.")
    }

    return (
        <Popover>
            <PopoverTrigger className="hover:bg-gray-100 transition-all size-full">
                {children}
            </PopoverTrigger>

            <PopoverContent>
                {!user && (
                    <>
                        <Link href="/auth/signin">
                            <PopoverItem icon={LogIn}>
                                Sign in
                            </PopoverItem>
                        </Link>

                        <Link href="/auth/signup">
                            <PopoverItem icon={UserPlus}>
                                Create an account
                            </PopoverItem>
                        </Link>
                    </>
                )}

                {user && (
                    <>
                        <Link href={`/app/profile/${user.username}`}>
                            <PopoverClose className="w-full">
                                <PopoverItem icon={BookUser}>
                                    View your profile
                                </PopoverItem>
                            </PopoverClose>
                        </Link>

                        <PopoverClose className="w-full">
                            <PopoverItem
                                icon={LogOut}
                                variant="destructive"
                                onClick={handleSignOut}
                            >
                                Sign out
                            </PopoverItem>
                        </PopoverClose>
                    </>
                )}
            </PopoverContent>
        </Popover>
    )
}