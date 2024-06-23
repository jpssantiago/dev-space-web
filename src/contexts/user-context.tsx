"use client"

import { ReactNode, createContext, useContext, useState } from "react"

import { User } from "@/models/user"
import { LoadUserResponse } from "@/responses/user-responses"
import * as UserService from "@/services/user-service"
import * as LikeService from "@/services/like-service"
import * as PostService from "@/services/post-service"
import { ToggleLikeResponse } from "@/responses/like-responses"
import { AddPostResponse, AddReplyResponse, DeletePostResponse } from "@/responses/post-responses"

type UserContextType = {
    user: User | undefined
    clearUser: () => void
    loadUser: () => Promise<LoadUserResponse>

    toggleLike: (postId: string) => Promise<ToggleLikeResponse>

    addPost: (text?: string, files?: string[]) => Promise<AddPostResponse>
    deletePost: (postId: string) => Promise<DeletePostResponse>
    addReply: (postId: string, text?: string, files?: string[]) => Promise<AddReplyResponse>
}

export const UserContext = createContext({} as UserContextType)

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined)

    async function loadUser(): Promise<LoadUserResponse> {
        const response = await UserService.loadUser()

        setUser(response.user)

        return response
    }

    async function clearUser() {
        setUser(undefined)
    }

    async function toggleLike(postId: string): Promise<ToggleLikeResponse> {
        const response = await LikeService.toggleLike(postId)
        return response
    }

    async function addPost(text?: string, files?: string[]): Promise<AddPostResponse> {
        const response = await PostService.addPost(text, files)
        return response
    }

    async function deletePost(postId: string): Promise<DeletePostResponse> {
        const response = await PostService.deletePost(postId)
        return response
    }

    async function addReply(postId: string, text?: string, files?: string[]): Promise<AddReplyResponse> {
        const response = await PostService.addReply(postId, text, files)
        return response
    }

    const value = {
        user,
        loadUser,
        clearUser,
        toggleLike,
        addPost,
        deletePost,
        addReply
    }
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}