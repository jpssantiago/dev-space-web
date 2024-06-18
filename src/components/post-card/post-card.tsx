import { Post } from "@/models/post"
import { PostCardHeader } from "./post-card-header"

type PostCardProps = {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    return (
        <div className="bg-white shadow-lg rounded-lg w-full">
            <PostCardHeader post={post} />
        </div>
    )
}