"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

import { User } from "@/models/user"
import  * as ProfileService from "@/services/profile-service"
import { LoadProfileResponse } from "@/responses/profile-responses"

type ProfileContextProps = {
    profile?: User
    setProfile: Dispatch<SetStateAction<User | undefined>>
    loadProfile: (username: string) => Promise<LoadProfileResponse>
}

export const ProfileContext = createContext({} as ProfileContextProps)

export function useProfile() {
    return useContext(ProfileContext)
}

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<User | undefined>(undefined)

    async function loadProfile(username: string): Promise<LoadProfileResponse> {
        const response = await ProfileService.loadProfile(username)
        setProfile(response.profile)
        return response
    }

    const value = {
        profile,
        setProfile,
        loadProfile
    }
    
    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}