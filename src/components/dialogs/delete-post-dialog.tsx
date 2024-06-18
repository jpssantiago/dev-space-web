"use client"

import { ReactNode, useState } from "react"
import { toast } from "sonner"

import { Post } from "@/models/post"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { PopoverClose } from "@radix-ui/react-popover"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/loading-button"

type DeletePostDialogProps = {
    post: Post
    children?: ReactNode
}

export function DeletePostDialog({ post, children }: DeletePostDialogProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    function handleOpenChange(status: boolean) {
        if (loading) return

        setOpen(status)
    }

    async function handleDelete() {
        if (loading) return

        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setLoading(false)

        setOpen(false)
        toast.success("Your post was deleted.")
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger className="size-full">{children}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        Your post will be deleted from our servers. 
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <PopoverClose asChild>
                        <DialogClose asChild>
                            <Button
                                disabled={loading}
                                variant="secondary"
                            >Cancel</Button>
                        </DialogClose>
                    </PopoverClose>

                    <LoadingButton 
                        loading={loading} 
                        variant="destructive"
                        onClick={handleDelete}
                    >Delete</LoadingButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}