"use client"

import { ReactNode } from "react"
import { toast } from "sonner"

import { User } from "@/models/user"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverItem } from "../popover-item/popover-item"
import { PopoverItemText } from "../popover-item/popover-item-text"
import { PopoverClose } from "@radix-ui/react-popover"

type UserProfilePopoverProps = {
    user: User
    children?: ReactNode
}

export function UserProfilePopover({ user, children }: UserProfilePopoverProps) {
    function handleCopyProfileLink() {
        navigator.clipboard.writeText(`${window.origin}/app/profile/${user.username}`)
        toast.success("The link was copied to your clipboard.")
    }
    
    return (
        <Popover>
            <PopoverTrigger>{children}</PopoverTrigger>

            <PopoverContent>
                <PopoverClose asChild>
                    <PopoverItem onClick={handleCopyProfileLink}>
                        <PopoverItemText>
                            Copy profile link
                        </PopoverItemText>
                    </PopoverItem>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}