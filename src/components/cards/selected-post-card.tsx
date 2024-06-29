"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Ellipsis, Heart, LinkIcon, MessageCircle } from "lucide-react"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"

import { Post } from "@/models/post"
import { useUser } from "@/contexts/user-context"
import { usePost } from "@/contexts/post-context"
import { useAuth } from "@/contexts/auth-context"
import { PostAuthorPopover } from "@/components/popovers/post-author-popover"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { UserHoverCard } from "@/components/hover-cards/user-hover-card"
import { TooltipItem } from "@/components/tooltip-item"
import { PostImagesDisplay } from "@/components/post-images-display"
import { PostCardAction } from "../post-card-action"
import { AddReplyDialog } from "../dialogs/add-reply-dialog"
import { SharePostDialog } from "../dialogs/share-post-dialog"

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

type SelectedPostCardProps = {
    post: Post
}

export function SelectedPostCard({ post }: SelectedPostCardProps) {
    const { user, toggleLike } = useUser()
    const { selectedPost, setSelectedPost } = usePost()
    const { signOut } = useAuth()
    const { push } = useRouter()

    const hasLiked = post.likes.filter(u => u.id == user?.id).length > 0

    async function handleLike() {
        const response = await toggleLike(post.id)
        if (response.err) {
            if (response.err == "unauthorized" || response.err == "no-token") {
                signOut()
                push("/auth/signin")
            }

            return toast.error(response.err)
        }

        if (selectedPost) {
            setSelectedPost({
                ...selectedPost,
                likes: hasLiked ? 
                    selectedPost.likes.filter(u => u.id != user?.id) : 
                    [...selectedPost.likes, response.like!.user]
            })
        }
    }

    return (
        <div className="flex flex-col gap-2 p-5 border-b">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <UserHoverCard user={post.author} className="h-fit cursor-pointer">
                        <Link href={`/app/profile/${post.author.username}`}>
                            <UserAvatar user={post.author} />
                        </Link>
                    </UserHoverCard>

                    <div className="flex items-center gap-1">
                        <UserHoverCard user={post.author} className="h-fit">
                            <Link href={`/app/profile/${post.author.username}`}>
                                <span className="border-b border-b-transparent hover:border-b-primary font-medium transition-all cursor-pointer">
                                    @{post.author.username}
                                </span>
                            </Link>
                        </UserHoverCard>

                        <span>·</span>

                        <TooltipItem className="cursor-default" tooltip={dayjs(post.createdAt).format("LLL")}>
                            <span className="border-b border-b-transparent dark:hover:border-b-zinc-400 hover:border-b-gray-600 text-gray-600 text-sm dark:text-zinc-400 transition-all cursor-default">
                                {dayjs().to(post.createdAt)}
                            </span>
                        </TooltipItem>
                    </div>
                </div>

                {user && user.id == post.author.id && (
                    <PostAuthorPopover post={post}>
                        <Button size="icon" variant="ghost">
                            <Ellipsis size={20} className="text-gray-600 dark:text-zinc-400" />
                        </Button>
                    </PostAuthorPopover>
                )}
            </div>

            <span className="text-[15px] text-gray-800 dark:text-zinc-200 break-words whitespace-pre-line">
                {post.text}
            </span>

            <PostImagesDisplay
                files={post.files}
            />

            <div className="flex gap-2 mt-2 -translate-x-2">
                <PostCardAction
                    icon={Heart}
                    onClick={handleLike}
                    className={hasLiked ? "text-blue-500 dark:text-blue-500 dark:hover:bg-zinc-950" : "dark:hover:bg-zinc-950"}
                >
                    {post.likes.length}
                </PostCardAction>

                <AddReplyDialog post={post}>
                    <PostCardAction
                        icon={MessageCircle}
                        className="hover:bg-emerald-100 dark:hover:bg-zinc-950 hover:text-emerald-600 dark:hover:text-emerald-600"
                    >
                        {post.replies.length}
                    </PostCardAction>
                </AddReplyDialog>

                <SharePostDialog post={post}>
                    <PostCardAction
                        icon={LinkIcon}
                        className="hover:bg-emerald-100 dark:hover:bg-zinc-950 hover:text-emerald-600 dark:hover:text-emerald-600"
                    >
                        Share
                    </PostCardAction>
                </SharePostDialog>
            </div>
        </div>
    )
}