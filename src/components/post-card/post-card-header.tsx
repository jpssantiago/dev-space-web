"use client"

import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import { Ellipsis } from "lucide-react"

import { Post } from "@/models/post"
import { UserAvatar } from "@/components/user-avatar"
import { TooltipItem } from "@/components/tooltip-item"
import { GlobeIconSvg } from "@/assets/globe-icon-svg"
import { PostAuthorActionsPopover } from "@/components/popovers/post-author-actions-popover"
import { Button } from "@/components/ui/button"
import { LoadUserResponse } from "@/responses/user-responses"

type PostCardHeaderProps = {
    post: Post
}

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

export function PostCardHeader({ post }: PostCardHeaderProps) {
    const { data: response } = useQuery<LoadUserResponse>({ queryKey: ["user"] })

    return (
        <div className="flex justify-between p-5">
            <div className="flex items-center gap-3">
                <UserAvatar user={post.author} />

                <div className="flex flex-col">
                    <span className="font-semibold text-lg">
                        {post.author.name} {post.author.lastName}
                    </span>

                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <TooltipItem tooltip={dayjs(post.createdAt).format("LLL")}>
                            <span>{dayjs().to(post.createdAt)} ·</span>
                        </TooltipItem>

                        <TooltipItem tooltip="Public">
                            <GlobeIconSvg />
                        </TooltipItem>

                        {post.createdAt != post.updatedAt && ( 
                            <TooltipItem tooltip={dayjs(post.updatedAt).format("LLL")}>
                                · last edited {dayjs().to(post.updatedAt)} ago
                            </TooltipItem>
                        )}
                    </div>
                </div>
            </div>

            {response?.user?.id == post.author.id && (
                <PostAuthorActionsPopover post={post}>
                    <span>
                        <Button variant="ghost" size="icon">
                            <Ellipsis />
                        </Button>
                    </span>
                </PostAuthorActionsPopover>
            )}
        </div>
    )
}