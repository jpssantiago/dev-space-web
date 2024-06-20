"use client"

import { ReactNode, createContext, useContext, useState } from "react"

import { User } from "@/models/user"
import { LoadUserResponse } from "@/responses/user-responses"
import * as UserService from "@/services/user-service"
import * as LikeService from "@/services/like-service"
import * as PostService from "@/services/post-service"
import { ToggleLikeResponse } from "@/responses/like-responses"
import { AddReplyResponse } from "@/responses/post-responses"

type UserContextType = {
    user: User | undefined
    loadUser: () => Promise<LoadUserResponse>

    toggleLike: (postId: string) => Promise<ToggleLikeResponse>

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

    async function toggleLike(postId: string): Promise<ToggleLikeResponse> {
        const response = await LikeService.toggleLike(postId)
        return response
    }

    async function addReply(postId: string, text?: string, files?: string[]): Promise<AddReplyResponse> {
        const response = await PostService.addReply(postId, text, files)
        return response
    }

    const value = {
        user,
        loadUser,
        toggleLike,
        addReply
    }
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}