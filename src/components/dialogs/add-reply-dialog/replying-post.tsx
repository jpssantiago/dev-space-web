import dayjs from "dayjs"

import { UserAvatar } from "@/components/user-avatar"
import { Post } from "@/models/post"

type ReplyingPostProps = {
    post: Post
}

export function ReplyingPost({ post }: ReplyingPostProps) {
    return (
        <div className="flex gap-2">
            <div className="flex flex-col items-center gap-2">
                <UserAvatar user={post.author} className="size-12" />

                <div className="bg-gray-300 rounded-full w-[2px] h-full" />
            </div>

            <div className="flex flex-col justify-start">
                <div className="flex items-center gap-1">
                    <span className="font-semibold">{post.author.name}</span>

                    <span className="text-gray-600 text-sm">@{post.author.username}</span>

                    <span>·</span>

                    <span className="text-gray-600 text-sm">
                        {dayjs().to(post.createdAt)}
                    </span>
                </div>

                <span>{post.text}</span>

                <div className="my-2 text-sm">
                    <span className="text-gray-600">Replying to </span>
                    <span className="text-blue-500">@{post.author.username}</span>
                </div>
            </div>
        </div>
    )
}