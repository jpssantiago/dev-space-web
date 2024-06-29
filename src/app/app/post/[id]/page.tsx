"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { usePost } from "@/contexts/post-context"
import { SelectedPostCard } from "@/components/cards/selected-post-card"
import { LoadingContainer } from "@/components/loading-container"
import { PostCard } from "@/components/cards/post-card"

type PostIdPageProps = {
    params: {
        id: string
    }
}

export default function PostIdPage({ params }: PostIdPageProps) {
    const [loading, setLoading] = useState<boolean>(true)

    const { selectedPost, loadSelectedPost } = usePost()
    const { push } = useRouter()

    useEffect(() => {
        loadSelectedPost(params.id).then(data => {
            setLoading(false)
            
            if (data.err || !data.post) {
                return push("/app/feed")
            }
        })
    }, [])

    return (
        <div className="flex flex-col">
            {loading && (
                <div className="h-[calc(100vh-56px)]">
                    <LoadingContainer size={32} />
                </div>
            )}

            {!loading && selectedPost && (
                <>
                    <SelectedPostCard post={selectedPost} />

                    {selectedPost.replies.length > 0 && (
                        <>
                            <div className="p-5 border-b">
                                <span>Replies</span>
                            </div>

                            {selectedPost.replies.map(reply => (
                                <PostCard key={reply.id} post={reply} />
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    )
}