"use client"

import { ReactNode, useState } from "react"

import { Post } from "@/models/post"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ReplyingPost } from "./replying-post"
import { AddReplyForm } from "./add-reply-form"

type AddReplyDialogProps = {
    post: Post
    children?: ReactNode
}

export function AddReplyDialog({ post, children }: AddReplyDialogProps) {
    const [open, setOpen] = useState<boolean>(false)

    function handleOpenChange(status: boolean) {
        // if (loading) return

        // if (!status) {
        //     setText("")
        //     setFiles([])
        //     clear()
        // }

        setOpen(status)
    }

    function handleAddReply() {
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger>{children}</DialogTrigger>

            <DialogContent className="flex flex-col gap-2 w-full max-w-[600px]">
                <ReplyingPost post={post} />

                <AddReplyForm
                    post={post}
                    onAddReply={handleAddReply}
                />
            </DialogContent>
        </Dialog>
    )
}