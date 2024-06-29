"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"

import { useUser } from "@/contexts/user-context"
import { useFeed } from "@/contexts/feed-context"
import { AddPostCard } from "@/components/cards/add-post-card"
import { LoadingContainer } from "@/components/loading-container"
import { PostCard } from "@/components/cards/post-card"

export default function FeedPage() {
    const [loading, setLoading] = useState<boolean>(true)

    const { user } = useUser()
    const { feed, loadFeed } = useFeed()

    useEffect(() => {
        loadFeed().then(response => {
            setLoading(false)

            if (response.err) {
                return toast.error(response.err)
            }
        })
    }, [])


    return (
        <div className="flex flex-col size-full">
            {loading && (
                <div className="h-[calc(100vh-56px)]">
                    <LoadingContainer size={32} />
                </div>
            )}

            {!loading && (
                <div className="flex flex-col size-full">
                    {user && <AddPostCard />}

                    {feed && feed.map(post => (
                        <PostCard 
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}