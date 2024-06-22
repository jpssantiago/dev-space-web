import { Ellipsis } from "lucide-react"

import { User } from "@/models/user"
import { UserAvatar } from "@/components/user-avatar"

type SelectedPostCardHeaderProps = {
    author: User
}

export function SelectedPostCardHeader({ author }: SelectedPostCardHeaderProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <UserAvatar user={author} />

                <div className="flex flex-col">
                    <span className="font-semibold">{author.name}</span>
                    <span className="text-gray-600 text-sm">@{author.username}</span>
                </div>
            </div>

            <Ellipsis className="text-gray-600" />
        </div>
    )
}