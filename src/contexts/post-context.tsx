"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

import { Post } from "@/models/post"
import * as PostService from "@/services/post-service"
import { GetPostResponse } from "@/responses/post-responses"

type PostContextType = {
    selectedPost?: Post
    setSelectedPost: Dispatch<SetStateAction<Post | undefined>>
    loadSelectedPost: (postId: string) => Promise<GetPostResponse>
}

export const PostContext = createContext({} as PostContextType)

export function usePost() {
    return useContext(PostContext)
}

export function PostProvider({ children }: { children: ReactNode }) {
    const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined)

    async function loadSelectedPost(postId: string): Promise<GetPostResponse> {
        const response = await PostService.getPost(postId)

        setSelectedPost(response.post)

        return response
    }

    const value = {
        selectedPost,
        setSelectedPost,
        loadSelectedPost
    }
    
    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}