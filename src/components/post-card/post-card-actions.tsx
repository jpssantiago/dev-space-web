"use client"

import { useRouter } from "next/navigation"
import { Heart, MessageCircle, Link } from "lucide-react"
import { toast } from "sonner"

import { Post } from "@/models/post"
import { useUser } from "@/contexts/user-context"
import { useFeed } from "@/contexts/feed-context"
import { PostCardAction } from "./post-card-action"
import { AddReplyDialog } from "@/components/dialogs/add-reply-dialog/add-reply-dialog"
import { SharePostDialog } from "@/components/dialogs/share-post-dialog"

type PostCardActionsProps = {
    post: Post
}

export function PostCardActions({ post }: PostCardActionsProps) {
    const { user, toggleLike } = useUser()
    const { feed, setFeed } = useFeed()
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

        setFeed(feed?.map(p => {
            if (p.id == post.id) {
                if (response.like) {
                    if (!hasLiked) {
                        p.likes.push(response.like.user)
                    } else {
                        p.likes = p.likes.filter(u => u.id != user?.id)
                    }
                }
            }
            
            return p
        }))
    }

    return (
        <div className="flex items-center gap-5 pl-12 w-full">
            <div onClick={e => e.stopPropagation()}>
                <PostCardAction 
                    icon={Heart}
                    iconClassName={hasLiked ? "text-blue-500" : ""}
                    onClick={handleLike}
                >
                    {post.likes.length}
                </PostCardAction>
            </div>

            <div onClick={e => e.stopPropagation()}>
                <AddReplyDialog post={post}>
                    <PostCardAction 
                        icon={MessageCircle} 
                        backgroundHover="hover:bg-emerald-100"
                        textHover="group-hover:text-emerald-600"
                    >
                        {post.replies.length}
                    </PostCardAction>
                </AddReplyDialog>
            </div>

            <div onClick={e => e.stopPropagation()}>
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
        </div>
    )
}