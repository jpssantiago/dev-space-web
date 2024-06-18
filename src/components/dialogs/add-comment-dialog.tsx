import { ReactNode } from "react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

type AddCommentDialogProps = {
    children?: ReactNode
}

export function AddCommentDialog({ children }: AddCommentDialogProps) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>

            <DialogContent>
                Add comment
            </DialogContent>
        </Dialog>
    )
}