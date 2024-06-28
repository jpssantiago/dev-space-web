"use client"

import { ReactNode } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { User } from "@/models/user"
import { useUser } from "@/contexts/user-context"
import { useFeed } from "@/contexts/feed-context"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"

type UserHoverCardProps = {
    user: User
    children?: ReactNode
    className?: string
}

export function UserHoverCard({ user, children, className }: UserHoverCardProps) {
    const { user: authenticatedUser, toggleFollow } = useUser()
    const { feed, setFeed } = useFeed()
    const { push } = useRouter()

    const isFollowing = authenticatedUser?.following.filter(u => u.id == user.id)[0]
    const isBeingFollowed = authenticatedUser?.followers.filter(u => u.id == user.id)[0]

    async function handleToggleFollow() {
        if (user.id == authenticatedUser?.id) return

        const response = await toggleFollow(user.id)
        if (response.err) {
            if (response.err == "unauthorized" || response.err == "no-token") {
                push("/auth/signin")
            }

            return toast.error(response.err)
        }

        if (response.follow) {
            setFeed(feed?.map(p => {
                if (p.author.id == user.id) {
                    if (isFollowing) {
                        p.author.followers = p.author.followers.filter(u => u.id != authenticatedUser.id)
                    } else {
                        p.author.followers.push(authenticatedUser!)
                    }
                }

                return p
            }))
        }
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild={true} className={className}>
                <span>
                    {children}
                </span>
            </HoverCardTrigger>

            <HoverCardContent align="end" className="flex flex-col cursor-default">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <Link href={`/app/profile/${user.username}`}>
                            <span className="dark:hover:border-primary border-b border-b-transparent hover:border-b-black font-medium text-lg transition-all">
                                {user.name}
                            </span>
                        </Link>

                        <Link href={`/app/profile/${user.username}`}>
                            <span className="border-b border-b-transparent dark:hover:border-b-zinc-200 hover:border-b-gray-600 text-gray-600 text-sm dark:text-zinc-200 transition-all">
                                @{user.username}
                            </span>
                        </Link>
                    </div>

                    <Link href={`/app/profile/${user.username}`}>
                        <UserAvatar user={user} className="size-20" />
                    </Link>
                </div>

                <div className="flex flex-col gap-1">
                    {user.description && (
                        <span className="mt-3 text-gray-800 text-sm dark:text-zinc-400">
                            {user.description}
                        </span>
                    )}

                    <span className="text-gray-800 text-sm dark:text-zinc-400">
                        {user.followers.length} {user.followers.length == 1 ? "follower" : "followers"}
                    </span>
                </div>


                <Button
                    onClick={handleToggleFollow}
                    disabled={authenticatedUser?.id == user.id}
                    className="mt-3"
                >
                    {!isFollowing && isBeingFollowed && "Follow back"}
                    {!isFollowing && !isBeingFollowed && "Follow"}
                    {isFollowing && "Unfollow"}
                </Button>
            </HoverCardContent>
        </HoverCard>
    )
}