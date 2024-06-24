"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"

import { useUser } from "@/contexts/user-context"
import { useFeed } from "@/contexts/feed-context"
import { AddPostCard } from "@/components/cards/add-post-card"
import { LoadingContainer } from "@/components/loading-container"

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
            {loading && <LoadingContainer size={32} />}

            {!loading && (
                <>
                    {user && <AddPostCard />}

                    {feed && (
                        <span>Feed has {feed.length} posts</span>
                    )}
                </>
            )}
        </div>
    )
}