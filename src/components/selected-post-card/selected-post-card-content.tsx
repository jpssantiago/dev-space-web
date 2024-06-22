import { Post } from "@/models/post"

type SelectedPostCardContentProps = {
    post: Post
}

export function SelectedPostCardContent({ post }: SelectedPostCardContentProps) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-gray-800 break-words whitespace-pre-line">{post.text}</span>

            {post.files.length > 0 && (
                <img
                    src={post.files[0]}
                    alt=""
                    className="mb-2 border rounded-lg max-w-[564px] max-h-[564px] object-contain"
                />
            )}
        </div>
    )
}