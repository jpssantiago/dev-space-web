"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Ellipsis, Heart, Link, MessageCircle } from "lucide-react"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"

import { Post } from "@/models/post"
import { useUser } from "@/contexts/user-context"
import { useFeed } from "@/contexts/feed-context"
import { UserAvatar } from "@/components/user-avatar"
import { PostImagesDisplay } from "@/components/post-images-display"
import { PostCardAction } from "@/components/post-card-action"
import { SharePostDialog } from "@/components/dialogs/share-post-dialog"
import { AddReplyDialog } from "@/components/dialogs/add-reply-dialog"
import { TooltipItem } from "@/components/tooltip-item"
import { Button } from "@/components/ui/button"
import { PostAuthorPopover } from "../popovers/post-author-popover"

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

type PostCardProps = {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    const [loading, setLoading] = useState<boolean>(false)

    const { user, toggleLike } = useUser()
    const { feed, setFeed } = useFeed()
    const { push } = useRouter()

    const hasLiked = post.likes.filter(u => u.id == user?.id).length > 0

    async function handleLike() {
        if (loading) return

        setLoading(true)
        const response = await toggleLike(post.id)
        setLoading(false)

        if (response.err) {
            if (response.err == "unauthorized" || response.err == "no-token") {
                push("/auth/signin")
            }

            return toast.error(response.err)
        }

        setFeed(feed?.map(p => {
            if (p.id == post.id) {
                if (hasLiked) {
                    p.likes = p.likes.filter(u => u.id != user?.id)
                } else {
                    p.likes.push(response.like!.user)
                }
            }

            return p
        }))
    }

    return (
        <div className="flex gap-2 px-5 py-3 border-b">
            <UserAvatar user={post.author} />

            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <span className="font-medium">@{post.author.username}</span>

                        <span>·</span>

                        <TooltipItem tooltip={dayjs(post.createdAt).format("LLL")}>
                            <span className="border-b border-b-transparent hover:border-b-gray-600 text-gray-600 text-sm transition-all cursor-default">
                                {dayjs().to(post.createdAt)}
                            </span>
                        </TooltipItem>
                    </div>

                    {user && user.id == post.author.id && (
                        <PostAuthorPopover post={post}>
                            <Button size="icon" variant="ghost">
                                <Ellipsis size={20} className="text-gray-600" />
                            </Button>
                        </PostAuthorPopover>
                    )}
                </div>

                <span className="text-[15px] text-gray-800 break-words whitespace-pre-line">
                    {post.text}
                </span>

                <PostImagesDisplay
                    files={post.files}
                />

                <div className="flex gap-2 mt-2 -translate-x-2">
                    <PostCardAction icon={Heart} onClick={handleLike} className={hasLiked ? "text-blue-500" : ""}>
                        {post.likes.length}
                    </PostCardAction>

                    <AddReplyDialog post={post}>
                        <PostCardAction icon={MessageCircle} className="hover:bg-emerald-100 hover:text-emerald-600">
                            {post.replies.length}
                        </PostCardAction>
                    </AddReplyDialog>

                    <SharePostDialog post={post}>
                        <PostCardAction icon={Link} className="hover:bg-purple-100 hover:text-purple-600">
                            Share
                        </PostCardAction>
                    </SharePostDialog>
                </div>
            </div>
        </div>
    )
}