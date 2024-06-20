"use client"

import { ReactNode, createContext, useContext, useState } from "react"

import { User } from "@/models/user"
import { LoadUserResponse } from "@/responses/user-responses"
import * as UserService from "@/services/user-service"

type UserContextType = {
    user: User | undefined
    loadUser: () => Promise<LoadUserResponse>
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

    const value = {
        user,
        loadUser
    }
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}