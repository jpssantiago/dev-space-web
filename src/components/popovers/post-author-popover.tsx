import { ReactNode } from "react"

import { Post } from "@/models/post"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DeletePostDialog } from "@/components/dialogs/delete-post-dialog"
import { PopoverItem } from "@/components/popover-item/popover-item"
import { PopoverItemText } from "@/components/popover-item/popover-item-text"

type PostAuthorPopoverProps = {
    post: Post
    children?: ReactNode
}

export function PostAuthorPopover({ post, children }: PostAuthorPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <span>
                    {children}
                </span>
            </PopoverTrigger>

            <PopoverContent>
                <DeletePostDialog post={post}>
                    <PopoverItem>
                        <PopoverItemText className="text-destructive">
                            Delete {post.parentPostId ? "reply" : "post"}
                        </PopoverItemText>
                    </PopoverItem>
                </DeletePostDialog>
            </PopoverContent>
        </Popover>
    )
}