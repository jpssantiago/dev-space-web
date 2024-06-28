"use client"

import { ReactNode, useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronRight, Computer, Languages, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { useAuth } from "@/contexts/auth-context"
import { useUser } from "@/contexts/user-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { PopoverItem } from "@/components/popover-item/popover-item"
import { PopoverItemText } from "@/components/popover-item/popover-item-text"
import { PopoverItemTail } from "@/components/popover-item/popover-item-tail"
import { ThemeSelectorPopover } from "./theme-selector-popover"
import { SelectThemeItem } from "@/components/select-theme-item"

type NavBarUserPopoverProps = {
    children?: ReactNode
}

export function NavBarUserPopover({ children }: NavBarUserPopoverProps) {
    const [popover, setPopover] = useState<"main" | "theme">("main")

    const { user } = useUser()
    const { signOut } = useAuth()
    const { push } = useRouter()
    const { theme, setTheme } = useTheme()

    function handleOpenChange(status: boolean) {
        if (!status) setPopover("main")
    }

    function handleSignOut() {
        signOut()
        toast.success("You are no longer authenticated.")
        push("/auth/signin")
    }

    return (
        <Popover onOpenChange={handleOpenChange}>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>

            <PopoverContent align="start" className="rounded-3xl">
                {popover == "main" ? (
                    <>
                        {user ? (
                            <>
                                <ThemeSelectorPopover onOpen={() => setPopover("theme")}>
                                    <PopoverItem>
                                        <PopoverItemText>Appearance</PopoverItemText>
                                        <PopoverItemTail icon={ChevronRight} />
                                    </PopoverItem>
                                </ThemeSelectorPopover>

                                <PopoverItem>
                                    <PopoverItemText>Language</PopoverItemText>
                                    <PopoverItemTail icon={Languages} />
                                </PopoverItem>

                                <PopoverClose className="w-full">
                                    <PopoverItem onClick={handleSignOut}>
                                        <PopoverItemText>Sign out</PopoverItemText>
                                    </PopoverItem>
                                </PopoverClose>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/signin">
                                    <PopoverItem>
                                        <PopoverItemText>Sign in</PopoverItemText>
                                    </PopoverItem>
                                </Link>

                                <Link href="/auth/signup">
                                    <PopoverItem>
                                        <PopoverItemText>Create an account</PopoverItemText>
                                    </PopoverItem>
                                </Link>
                            </>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col gap-3">
                        <div className="relative flex justify-center items-center w-full">
                            <ArrowLeft
                                size={20}
                                className="left-0 absolute cursor-pointer"
                                onClick={() => setPopover("main")}
                            />

                            <span className="justify-self-center font-medium">Appearance</span>
                        </div>

                        <div className="flex bg-gray-50 dark:bg-zinc-950 rounded-xl w-full h-12">
                            <SelectThemeItem
                                icon={Sun}
                                isSelected={theme == "light"}
                                onSelect={() => setTheme("light")}
                            />

                            <SelectThemeItem
                                icon={Moon}
                                isSelected={theme == "dark"}
                                onSelect={() => setTheme("dark")}
                            />

                            <SelectThemeItem
                                icon={Computer}
                                isSelected={theme == "system"}
                                onSelect={() => setTheme("system")}
                            />
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}