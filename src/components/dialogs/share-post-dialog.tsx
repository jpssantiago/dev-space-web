import { ReactNode } from "react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

type SharePostDialogProps = {
    children?: ReactNode
}

export function SharePostDialog({ children }: SharePostDialogProps) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>

            <DialogContent>
                share
            </DialogContent>
        </Dialog>
    )
}