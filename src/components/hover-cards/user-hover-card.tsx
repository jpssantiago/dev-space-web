"use client"

import { ReactNode } from "react"
import Link from "next/link"

import { User } from "@/models/user"
import { useUser } from "@/contexts/user-context"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"

type UserHoverCardProps = {
    user: User
    children?: ReactNode
    className?: string
}

export function UserHoverCard({ user, children, className }: UserHoverCardProps) {
    const { user: authenticatedUser } = useUser()

    const isFollowing = authenticatedUser?.following.filter(u => u.id == user.id)[0]
    const isBeingFollowed = authenticatedUser?.followers.filter(u => u.id == user.id)[0] 

    async function handleToggleFollow() {
        //
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild={true} className={className}>
                <span>
                    {children}
                </span>
            </HoverCardTrigger>

            <HoverCardContent align="end" className="flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <Link href={`/app/profile/${user.username}`}>
                            <span className="border-b border-b-transparent hover:border-b-black font-medium text-lg transition-all">
                                {user.name}
                            </span>
                        </Link>

                        <Link href={`/app/profile/${user.username}`}>
                            <span className="border-b border-b-transparent hover:border-b-gray-600 text-gray-600 text-sm transition-all">
                                @{user.username}
                            </span>
                        </Link>
                    </div>

                    <Link href={`/app/profile/${user.username}`}>
                        <UserAvatar user={user} className="size-12" />
                    </Link>
                </div>

                {user.description && (
                    <span className="mt-5 text-gray-800 text-sm">
                        {user.description}
                    </span>
                )}

                <span className="mt-2 font-light text-gray-500 text-sm">
                    {user.followers.length} followers
                </span>

                <Button 
                    onClick={handleToggleFollow}
                    disabled={authenticatedUser?.id == user.id} 
                    className="mt-2"
                >
                    {!isFollowing && isBeingFollowed && "Follow back"}
                    {isFollowing && !isBeingFollowed && "Unfollow"}
                    {!isFollowing && !isBeingFollowed && "Follow"}
                </Button>
            </HoverCardContent>
        </HoverCard>
    )
}