import { Post } from "@/models/post"

type PostCardContentProps = {
    post: Post
}

export function PostCardContent({ post }: PostCardContentProps) {
    return (
        <div className="flex flex-col items-start gap-2 size-full">
            <span className="text-[15px] text-gray-800 break-words whitespace-pre-line">{post.text}</span>

            {post.files.length > 0 && (
                <img
                    src={post.files[0]}
                    alt=""
                    className="mb-2 border rounded-lg max-w-[516px] max-h-[516px] object-contain"
                />
            )}
        </div>
    )
}