"use client"

import { useRouter } from "next/navigation"
import { Heart, Link, MessageCircle } from "lucide-react"
import { toast } from "sonner"

import { Post } from "@/models/post"
import { Like } from "@/models/like"
import { useUser } from "@/contexts/user-context"
import { PostCardAction } from "@/components/post-card/post-card-action"
import { AddReplyDialog } from "@/components/dialogs/add-reply-dialog/add-reply-dialog"
import { SharePostDialog } from "@/components/dialogs/share-post-dialog"

type SelectedPostCardActionsProps = {
    post: Post
    onToggleLike: (like: Like) => void
    onAddReply: (reply: Post) => void
}

export function SelectedPostCardActions({ post, onToggleLike, onAddReply }: SelectedPostCardActionsProps) {
    const { user, toggleLike } = useUser()
    const { push } = useRouter()

    const hasLiked = post.likes.map(u => u.id == user?.id).length > 0

    async function handleLike() {
        const response = await toggleLike(post.id)
        if (response.err) { 
            if (response.err == "unauthorized" || response.err == "no-token") {
                return push("/auth/sign-in")
            }

            return toast(response.err)
        }

        if (response.like) {
            onToggleLike(response.like)
        }
    }

    return (
        <div className="flex justify-between items-center">
            <div className="cursor-pointer">
                <PostCardAction
                    icon={Heart}
                    iconClassName={hasLiked ? "text-blue-500" : ""}
                    onClick={handleLike}
                >
                    {post.likes.length}
                </PostCardAction>
            </div>

            <AddReplyDialog post={post} onAddReply={onAddReply}>
                <PostCardAction
                    icon={MessageCircle}
                    backgroundHover="hover:bg-emerald-100"
                    textHover="group-hover:text-emerald-600"
                >
                    {post.replies.length}
                </PostCardAction>
            </AddReplyDialog>

            <SharePostDialog post={post}>
                <PostCardAction
                    icon={Link}
                    backgroundHover="hover:bg-purple-100"
                    textHover="group-hover:text-purple-500"
                >
                    Share
                </PostCardAction>
            </SharePostDialog>
        </div>
    )
}