"use client"

import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Post } from "@/models/post"
import { useUser } from "@/contexts/user-context"
import { useFeed } from "@/contexts/feed-context"
import { usePost } from "@/contexts/post-context"
import { useProfile } from "@/contexts/profile-context"
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

    const { user, deletePost } = useUser()
    const { feed, setFeed } = useFeed()
    const { selectedPost, setSelectedPost } = usePost()
    const { profile, setProfile } = useProfile()
    const { push } = useRouter()

    function handleOpenChange(status: boolean) {
        if (loading) return
        
        setOpen(status)
    }

    async function handleDelete() {
        if (loading) return
        if (!user || user.id != post.author.id) return setOpen(false)

        setLoading(true)
        const response = await deletePost(post.id)
        setLoading(false)

        if (response.err) {
            if (response.err == "unauthorized" || response.err == "no-token") {
                return push("/auth/sign-in")
            }

            return toast.error(response.err)
        }

        setFeed(feed?.filter(p => p.id != post.id))

        if (selectedPost) {
            if (selectedPost.id == post.parentPostId) {
                setSelectedPost({
                    ...selectedPost,
                    replies: selectedPost.replies.filter(r => r.id != post.id)
                })
            }

            if (selectedPost.id == post.id) {
                if (selectedPost.parentPostId) {
                    push(`/app/post/${selectedPost.parentPostId}`)
                } else {
                    push("/app/feed")
                }
            }
        }

        if (profile) {
            setProfile({
                ...profile,
                posts: profile.posts.filter(p => p.id != post.id)
            })
        }

        toast.success(`The ${post.parentPostId ? "reply" : "post"} was deleted.`)
        setOpen(false)

        // TODO: Find a way to close the popover 🙏
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger className="w-full">{children}</DialogTrigger>

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