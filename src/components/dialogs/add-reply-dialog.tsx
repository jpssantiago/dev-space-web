import { ReactNode } from "react"

import { Post } from "@/models/post"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

type AddReplyDialogProps = {
    post: Post
    children?: ReactNode
}

export function AddReplyDialog({ post, children }: AddReplyDialogProps) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>

            <DialogContent>
                add reply
            </DialogContent>
        </Dialog>
    )
}