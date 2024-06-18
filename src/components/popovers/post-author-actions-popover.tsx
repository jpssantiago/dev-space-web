import { ReactNode } from "react"
import { Pen, Trash } from "lucide-react"

import { Post } from "@/models/post"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverItem } from "@/components/popover-item"
import { DeletePostDialog } from "@/components/dialogs/delete-post-dialog"
import { EditPostDialog } from "../dialogs/edit-post-dialog"

type PostAuthorActionsPopoverProps = {
    post: Post
    children?: ReactNode
}

export function PostAuthorActionsPopover({ post, children }: PostAuthorActionsPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>

            <PopoverContent className="p-2">
                <EditPostDialog post={post}>
                    <PopoverItem icon={Pen}>Edit post</PopoverItem>
                </EditPostDialog>

                <DeletePostDialog post={post}>
                    <PopoverItem icon={Trash} variant="destructive">Delete post</PopoverItem>
                </DeletePostDialog>
            </PopoverContent>
        </Popover>
    )
}