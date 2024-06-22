"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

import { Post } from "@/models/post"
import * as PostService from "@/services/post-service"
import { GetPostResponse } from "@/responses/post-responses"

type PostContextType = {
    post?: Post
    setPost: Dispatch<SetStateAction<Post | undefined>>
    loadPost: (postId: string) => Promise<GetPostResponse>
}

export const PostContext = createContext({} as PostContextType)

export function usePost() {
    return useContext(PostContext)
}

export function PostProvider({ children }: { children: ReactNode }) {
    const [post, setPost] = useState<Post | undefined>(undefined)

    async function loadPost(postId: string): Promise<GetPostResponse> {
        const response = await PostService.getPost(postId)

        setPost(response.post)

        return response
    }

    const value = {
        post,
        setPost,
        loadPost
    }
    
    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}