"use client"

import { useEffect } from "react"

import { useFeed } from "@/contexts/feed-context"
import { LoadingContainer } from "@/components/loading-container"
import { AddPostCard } from "@/components/add-post-card"
import { PostCard } from "@/components/post-card/post-card"

export default function FeedPage() {
    const { feed, loadFeed } = useFeed()

    useEffect(() => {
        loadFeed()
    }, [])

    return (
        <div className="flex flex-col">
            {!feed && (
                <div className="h-screen">
                    <LoadingContainer size={32} />
                </div>
            )}

            {feed && (
                <div className="flex flex-col h-full">
                    <AddPostCard />

                    {feed.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </div>
            )}
        </div>
    )
}