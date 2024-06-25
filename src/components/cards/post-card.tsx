"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import { Ellipsis, Heart, Link as LinkIcon, MessageCircle } from "lucide-react"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"

import { Post } from "@/models/post"
import { useUser } from "@/contexts/user-context"
import { useFeed } from "@/contexts/feed-context"
import { usePost } from "@/contexts/post-context"
import { UserAvatar } from "@/components/user-avatar"
import { PostImagesDisplay } from "@/components/post-images-display"
import { PostCardAction } from "@/components/post-card-action"
import { SharePostDialog } from "@/components/dialogs/share-post-dialog"
import { AddReplyDialog } from "@/components/dialogs/add-reply-dialog"
import { TooltipItem } from "@/components/tooltip-item"
import { PostAuthorPopover } from "@/components/popovers/post-author-popover"
import { UserHoverCard } from "@/components/hover-cards/user-hover-card"
import { StopPropagationItem } from "@/components/stop-propagation-item"

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
    const { selectedPost, setSelectedPost } = usePost()
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

        if (selectedPost) {
            setSelectedPost({
                ...selectedPost,
                replies: selectedPost.replies.map(reply => {
                    if (reply.id == post.id) {
                        if (hasLiked) {
                            reply.likes = selectedPost.likes.filter(u => u.id != user?.id)
                        } else {
                            reply.likes.push(response.like!.user)
                        }
                    }

                    return reply
                })
                
            })
        }
    }

    return (
        <div 
            onClick={() => push(`/app/post/${post.id}`)} 
            className="flex items-start gap-2 hover:bg-gray-50 px-5 py-3 border-b w-full transition-all cursor-pointer"
        >
            <StopPropagationItem>
                <UserHoverCard user={post.author} className="h-fit cursor-pointer">
                    <Link href={`/app/profile/${post.author.username}`}>
                        <UserAvatar user={post.author} />
                    </Link>
                </UserHoverCard>
            </StopPropagationItem>

            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1">
                        <StopPropagationItem>
                            <UserHoverCard user={post.author} className="h-fit">
                                <Link href={`/app/profile/${post.author.username}`}>
                                    <span className="border-b border-b-transparent hover:border-b-primary font-medium transition-all cursor-pointer">
                                        @{post.author.username}
                                    </span>
                                </Link>
                            </UserHoverCard>
                        </StopPropagationItem>

                        <span>·</span>

                        <StopPropagationItem>
                            <TooltipItem className="cursor-default" tooltip={dayjs(post.createdAt).format("LLL")}>
                                <span className="border-b border-b-transparent hover:border-b-gray-600 text-gray-600 text-sm transition-all cursor-default">
                                    {dayjs().to(post.createdAt)}
                                </span>
                            </TooltipItem>
                        </StopPropagationItem>
                    </div>

                    {user && user.id == post.author.id && (
                        <StopPropagationItem>
                            <PostAuthorPopover post={post}>
                                <Ellipsis size={20} className="text-gray-600 hover:text-blue-500 transition-all" />
                            </PostAuthorPopover>
                        </StopPropagationItem>
                    )}
                </div>

                <span className="text-[15px] text-gray-800 break-words whitespace-pre-line">
                    {post.text}
                </span>

                <PostImagesDisplay
                    files={post.files}
                />

                <div className="flex gap-2 mt-2 -translate-x-2">
                    <StopPropagationItem>
                        <PostCardAction icon={Heart} onClick={handleLike} className={hasLiked ? "text-blue-500" : ""}>
                            {post.likes.length}
                        </PostCardAction>
                    </StopPropagationItem>

                    <StopPropagationItem>
                        <AddReplyDialog post={post}>
                            <PostCardAction icon={MessageCircle} className="hover:bg-emerald-100 hover:text-emerald-600">
                                {post.replies.length}
                            </PostCardAction>
                        </AddReplyDialog>
                    </StopPropagationItem>

                    <StopPropagationItem>
                        <SharePostDialog post={post}>
                            <PostCardAction icon={LinkIcon} className="hover:bg-purple-100 hover:text-purple-600">
                                Share
                            </PostCardAction>
                        </SharePostDialog>
                    </StopPropagationItem>
                </div>
            </div>
        </div>
    )
}