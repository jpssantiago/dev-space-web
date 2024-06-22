"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Post } from "@/models/post"
import { Like } from "@/models/like"
import { usePost } from "@/contexts/post-context"
import { LoadingContainer } from "@/components/loading-container"
import { SelectedPostCard } from "@/components/selected-post-card/selected-post-card"
import { PostCard } from "@/components/post-card/post-card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"

type PostIdPageProps = {
    params: {
        id: string
    }
}

export default function PostIdPage({ params }: PostIdPageProps) {
    const [loading, setLoading] = useState<boolean>(true)

    const { selectedPost, loadSelectedPost } = usePost()
    const { user } = useUser()
    const { push } = useRouter()

    useEffect(() => {
        loadSelectedPost(params.id).then(data => {
            setLoading(false)

            if (data.err) {
                return handleBack()
            }
        })
    }, [])

    function handleBack() {
        if (selectedPost?.parentPostId) {
            push(`/app/post/${selectedPost.parentPostId}`)
        } else {
            push("/app/feed")
        }
    }

    return (
        <div className="min-h-[calc(100vh-56px)]">
            {loading && <LoadingContainer />}

            {selectedPost && (
                <div className="flex-flex-col">
                    <div className="flex items-center gap-2 px-3 py-2 border-b">
                        <Button onClick={handleBack} size="icon" variant="ghost">
                            <ArrowLeft />
                        </Button>

                        <span className="font-semibold text-lg">Post</span>
                    </div>

                    <SelectedPostCard
                        post={selectedPost}
                    />

                    {selectedPost.replies.map(reply => (
                        <PostCard
                            key={reply.id}
                            post={reply}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}