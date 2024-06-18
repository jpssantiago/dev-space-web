import { Post } from "@/models/post"

type PostCardContentProps = {
    post: Post
}

export function PostCardContent({ post }: PostCardContentProps) {
    return (
        <div className="flex flex-col gap-2 size-full">
            <span className="text-[15px] text-gray-600">{post.text}</span>

            <img
                src={post.file}
                alt=""
                className="rounded-lg max-w-[516px] max-h-[516px] object-contain"
            />
        </div>
    )
}