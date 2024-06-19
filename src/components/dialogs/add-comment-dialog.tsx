import { ReactNode } from "react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Post } from "@/models/post"

type AddCommentDialogProps = {
    post: Post
    children?: ReactNode
}

export function AddCommentDialog({ post, children }: AddCommentDialogProps) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>

            <DialogContent>
                Add comment
            </DialogContent>
        </Dialog>
    )
}