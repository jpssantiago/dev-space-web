import Link from "next/link"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"

import { Post } from "@/models/post"
import { UserHoverCard } from "@/components/hover-cards/user-hover-card"
import { TooltipItem } from "@/components/tooltip-item"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"
import { PostAuthorActionsPopover } from "../popovers/post-author-actions-popover"

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    relativeTime: {
        future: "in",
        past: "%s",
        s: '1s',
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1M",
        MM: "%dM",
        y: "1y",
        yy: "%dy"
    }
})

type PostCardHeaderProps = {
    post: Post
}

export function PostCardHeader({ post }: PostCardHeaderProps) {
    function getDateTooltip(): string {
        let tooltip: string = dayjs(post.createdAt).format("LLL")

        if (dayjs(post.updatedAt).to(post.createdAt) != "1s") {
            return `${tooltip} (last updated ${dayjs().to(post.updatedAt)} ago)`
        }

        return tooltip
    }

    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
                <UserHoverCard user={post.author}>
                    <Link
                        href={`/app/profile/${post.author.username}`}
                        className="font-semibold hover:text-blue-500 transition-all"
                    >{post.author.name}
                    </Link>
                </UserHoverCard>

                <div className="flex items-center gap-1 h-6">
                    <UserHoverCard user={post.author}>
                        <Link
                            href={`/app/profille/${post.author.username}`}
                            className="border-b border-b-transparent hover:border-b-gray-600 h-5 text-gray-600 text-sm transition-all"
                        >@{post.author.username}</Link>
                    </UserHoverCard>

                    <span>·</span>

                    <TooltipItem
                        tooltip={getDateTooltip()}
                    >
                        <span className="border-b border-b-transparent hover:border-b-gray-600 h-full text-gray-600 text-sm transition-all">
                            {dayjs().to(post.createdAt)}
                        </span>
                    </TooltipItem>
                </div>
            </div>

            <PostAuthorActionsPopover post={post}>
                <div className="pr-3">
                    <Ellipsis size={20} className="text-gray-600 hover:text-blue-500 transition-all" />
                </div>
            </PostAuthorActionsPopover>
        </div>
    )
}