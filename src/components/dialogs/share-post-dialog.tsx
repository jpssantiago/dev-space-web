import { ReactNode } from "react"
import { toast } from "sonner"
import { Copy } from "lucide-react"

import { Post } from "@/models/post"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { IconTextButton } from "@/components/icon-text-button"

type SharePostDialogProps = {
    post: Post
    children: ReactNode
}

export function SharePostDialog({ post, children }: SharePostDialogProps) {
    const link = `${window.origin}/post/${post.id}`

    function handleCopyLink() {
        navigator.clipboard.writeText(link)
        toast.success("The link was copied to your clipboard.")
    }
    
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share this post</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to see this post,
                        even if they do not have an account.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center gap-3">
                    <Input
                        value={link}
                        readOnly
                    />

                    <IconTextButton
                        icon={Copy}
                        onClick={handleCopyLink}
                    >Copy link</IconTextButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}