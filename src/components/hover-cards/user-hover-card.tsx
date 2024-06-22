"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { BookUser } from "lucide-react"

import { User } from "@/models/user"
import { useUser } from "@/contexts/user-context"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/loading-button"
import { IconTextButton } from "@/components/icon-text-button"

type UserHoverCardProps = {
    user: User
    children?: ReactNode
}

export function UserHoverCard({ user, children }: UserHoverCardProps) {
    const [loading, setLoading] = useState<boolean>(false)

    const { user: authenticatedUser } = useUser()

    function getFollowButtonMessage(): string {
        const isFollowing = (authenticatedUser?.following.filter(u => u.id == user.id) ?? []).length > 0
        const isBeingFollowed = (authenticatedUser?.followers.filter(u => u.id == user.id) ?? []).length > 0

        if (isFollowing) {
            return "Unfollow"
        }

        if (isBeingFollowed && !isFollowing) {
            return "Follow back"
        }
        
        return "Follow"
    }

    async function handleFollow() {
        if (loading) return

        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setLoading(false)
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>

            <HoverCardContent align="end" className="w-fit">
                <div className="flex flex-col gap-5 cursor-default">
                    <div className="flex items-center gap-3">
                        <Link href={`/app/profile/${user.username}`}>
                            <UserAvatar user={user} className="size-24" />
                        </Link>

                        <div className="flex flex-col gap-1">
                            <Link
                                href={`/app/profile/${user.username}`}
                                className="font-semibold text-xl hover:text-blue-500 transition-all"
                            >
                                {user.name}
                            </Link>

                            <div className="flex flex-col text-gray-700">
                                <span>
                                    Following: <strong>{user.following.length}</strong>
                                </span>

                                <span>
                                    Followers: <strong>{user.followers.length}</strong>
                                </span>

                                {user.description && (
                                    <span>
                                        {user.description}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {authenticatedUser?.id == user.id ? (
                            <Link href={`/app/profile/${user.username}`}>
                                <IconTextButton icon={BookUser}>
                                    View your profile
                                </IconTextButton>
                            </Link>
                        ) : (
                            <LoadingButton 
                                loading={loading} 
                                onClick={handleFollow}
                            >{getFollowButtonMessage()}</LoadingButton>
                        )}

                        {authenticatedUser?.id != user.id && (
                            <Link href={`/app/chat/${user.username}`}>
                                <Button variant="outline">
                                    Send a message 👋
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}