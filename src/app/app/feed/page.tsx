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
        <div className="flex size-full">
            {isLoading && <LoadingContainer size={32} />}

            {response && response.feed && (
                <div className="flex flex-col gap-5 mx-auto max-w-[680px] size-full">
                    {response.feed?.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </div>
            )}
        </div>
    )
}