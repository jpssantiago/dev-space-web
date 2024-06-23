import { Ellipsis } from "lucide-react"

import { Post } from "@/models/post"
import { UserAvatar } from "@/components/user-avatar"
import { PostAuthorActionsPopover } from "../popovers/post-author-actions-popover"

type SelectedPostCardHeaderProps = {
    post: Post
}

export function SelectedPostCardHeader({ post }: SelectedPostCardHeaderProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <UserAvatar user={post.author} />

                <div className="flex flex-col">
                    <span className="font-semibold">{post.author.name}</span>
                    <span className="text-gray-600 text-sm">@{post.author.username}</span>
                </div>
            </div>

            <PostAuthorActionsPopover post={post}>
                <div className="pr-3 cursor-pointer">
                    <Ellipsis size={20} className="text-gray-600 hover:text-blue-500 transition-all" />
                </div>
            </PostAuthorActionsPopover>
        </div>
    )
}