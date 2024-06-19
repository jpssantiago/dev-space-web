"use client"

import { ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
import { Trash } from "lucide-react"

import { Post } from "@/models/post"
import { LoadUserResponse } from "@/responses/user-responses"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverItem } from "@/components/popover-item"
import { DeletePostDialog } from "@/components/dialogs/delete-post-dialog"

type PostAuthorActionsPopoverProps = {
    post: Post
    children?: ReactNode
}

export function PostAuthorActionsPopover({ post, children }: PostAuthorActionsPopoverProps) {
    const { data: response } = useQuery<LoadUserResponse>({ queryKey: ["user"] })

    if (response?.user?.id != post.author.id) {
        return <div />
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>

            <PopoverContent className="p-2">
                <DeletePostDialog post={post}>
                    <PopoverItem icon={Trash} variant="destructive">Delete post</PopoverItem>
                </DeletePostDialog>
            </PopoverContent>
        </Popover>
    )
}