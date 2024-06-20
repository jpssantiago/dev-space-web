"use client"

import Link from "next/link"

import { Post } from "@/models/post"
import { UserHoverCard } from "@/components/hover-cards/user-hover-card"
import { UserAvatar } from "@/components/user-avatar"
import { PostCardHeader } from "./post-card-header"
import { PostCardContent } from "./post-card-content"
import { PostCardActions } from "./post-card-actions"
import { twMerge } from "tailwind-merge"

type PostCardProps = {
    post: Post
}

export function PostCard({ post }: PostCardProps) {   
    return (
        <div 
            className="bg-white hover:bg-gray-100 p-2 border-b w-full transition-all cursor-pointer"
        >
            <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                    <UserHoverCard user={post.author}>
                        <Link href={`/app/profile/${post.author.username}`}>
                            <UserAvatar user={post.author} className="size-12" />
                        </Link>
                    </UserHoverCard>

                    <div className="flex flex-col items-start gap-1 w-full">
                        <PostCardHeader post={post} />
                        <PostCardContent post={post} />
                    </div>    
                </div>

                <PostCardActions post={post} />
            </div>
        </div>
    )
}