"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Post } from "@/models/post"
import { Like } from "@/models/like"
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
    const [post, setPost] = useState<Post | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    const { user } = useUser()
    const { push, back } = useRouter()

    async function loadPost() {
        try {
            const response = await fetch(`http://localhost:3333/post/${params.id}`)
            const data = await response.json()
            setLoading(false)

            if (data.err) {
                return push("/app/feed")
            }

            setPost(data.post)
        } catch {
            setLoading(false)
            push("/app/feed")
        }
    }

    useEffect(() => {
        loadPost()
    }, [])

    function handleBack() {
        if (post?.parentPostId) {
            push(`/app/post/${post.parentPostId}`)
        } else {
            push("/app/feed")
        }
    }

    function handleToggleLike(like: Like) {
        const hasLiked = (post?.likes.map(u => u.id == user?.id) ?? []).length > 0

        if (hasLiked) {
            setPost({
                ...post!,
                likes: post!.likes.filter(u => u.id != user?.id)
            })
        } else {
            setPost({
                ...post!,
                likes: [...post!.likes, like.user]
            })
        }
    }

    function handleAddReply(reply: Post, parentPost?: Post) {
        if (!parentPost) {
            setPost({
                ...post!,
                replies: [reply, ...post!.replies]
            })
        }

    }

    return (
        <div className="min-h-[calc(100vh-56px)]">
            {loading && <LoadingContainer />}

            {post && (
                <div className="flex-flex-col">
                    <div className="flex items-center gap-2 px-3 py-2 border-b">
                        <Button onClick={handleBack} size="icon" variant="ghost">
                            <ArrowLeft />
                        </Button>

                        <span className="font-semibold text-lg">Post</span>
                    </div>

                    <SelectedPostCard
                        post={post}
                        onToggleLike={handleToggleLike}
                        onAddReply={handleAddReply}
                    />

                    {post.replies.map(reply => (
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