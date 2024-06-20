import { Heart, MessageCircle, Link } from "lucide-react"

import { Post } from "@/models/post"
import { PostCardAction } from "./post-card-action"
import { AddReplyDialog } from "@/components/dialogs/add-reply-dialog/add-reply-dialog"
import { SharePostDialog } from "@/components/dialogs/share-post-dialog"

type PostCardActionsProps = {
    post: Post
}

export function PostCardActions({ post }: PostCardActionsProps) {
    return (
        <div className="flex items-center gap-5 pl-12 w-full">
            <PostCardAction 
                icon={Heart}
                iconClassName=""
                // text-blue-500 if the user has liked this post.
            >
                {post.likes.length}
            </PostCardAction>

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