"use client"

import { useRouter } from "next/navigation"
import { Heart, Link, MessageCircle } from "lucide-react"
import { toast } from "sonner"

import { Post } from "@/models/post"
import { useUser } from "@/contexts/user-context"
import { usePost } from "@/contexts/post-context"
import { PostCardAction } from "@/components/post-card/post-card-action"
import { AddReplyDialog } from "@/components/dialogs/add-reply-dialog/add-reply-dialog"
import { SharePostDialog } from "@/components/dialogs/share-post-dialog"

type SelectedPostCardActionsProps = {
    post: Post
}

export function SelectedPostCardActions({ post }: SelectedPostCardActionsProps) {
    const { user, toggleLike } = useUser()
    const { post: selectedPost, setPost } = usePost()
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

        if (selectedPost && response.like && user) {
            if (hasLiked) {
                setPost({
                    ...selectedPost,
                    likes: selectedPost.likes.filter(u => u.id != user.id)
                })
            } else {
                setPost({
                    ...selectedPost,
                    likes: [...selectedPost.likes, response.like.user]
                })
            }
        }
    }

    return (
        <div className="flex justify-between items-center -translate-x-2">
            <div className="cursor-pointer">
                <PostCardAction
                    icon={Heart}
                    iconClassName={hasLiked ? "text-blue-500" : ""}
                    onClick={handleLike}
                >
                    {post.likes.length}
                </PostCardAction>
            </div>

            <AddReplyDialog post={post}>
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