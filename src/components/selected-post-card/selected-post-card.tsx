import { Post } from "@/models/post"
import { SelectedPostCardHeader } from "./selected-post-card-header"
import { SelectedPostCardContent } from "./selected-post-card-content"
import { SelectedPostCardActions } from "./selected-post-card-actions"
import { Like } from "@/models/like"

type SelectedPostCardProps = {
    post: Post
    onToggleLike: (like: Like) => void
    onAddReply: (reply: Post) => void
}

export function SelectedPostCard({ post, onToggleLike, onAddReply }: SelectedPostCardProps) {
    return (
        <div className="flex flex-col gap-2 px-5 py-2 border-b text-[15px]">
            <SelectedPostCardHeader
                author={post.author}
            />

            <SelectedPostCardContent
                post={post}
            />

            <SelectedPostCardActions
                post={post}
                onToggleLike={onToggleLike}
                onAddReply={onAddReply}
            />
        </div>
    )
}