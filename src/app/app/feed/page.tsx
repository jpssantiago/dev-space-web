"use client"

import { useQuery } from "@tanstack/react-query"

import { loadFeed } from "@/services/feed-service"
import { LoadingContainer } from "@/components/loading-container"
import { PostCard } from "@/components/post-card/post-card"

export default function FeedPage() {
    const { isLoading, data: response } = useQuery({
        queryKey: ["feed"],
        queryFn: loadFeed
    })

    return (
        <div className="flex flex-col">
            {isLoading && (
                <div className="h-screen">
                    <LoadingContainer size={32} />
                </div>
            )}

            {response && response.feed && (
                <div className="flex flex-col h-full">
                    {response.feed?.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </div>
            )}
        </div>
    )
}