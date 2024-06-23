"use client"

import { ReactNode, createContext, useContext } from "react"

import { SignInResponse } from "@/responses/auth-responses"
import * as AuthService from "@/services/auth-service"
import * as TokenService from "@/services/token-service"
import { useUser } from "@/contexts/user-context"

type AuthContextType = {
    signIn: (emailOrUsername: string, password: string) => Promise<SignInResponse>
    signOut: () => void
}

const AuthContext = createContext({} as AuthContextType)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const userContext = useUser()

    async function signIn(emailOrUsername: string, password: string): Promise<SignInResponse> {
        const response = await AuthService.signIn(emailOrUsername, password)
        
        if (response.token) {
            TokenService.setToken(response.token)
        }
        
        return response
    }

    async function signOut() {
        TokenService.deleteToken()
        userContext.clearUser()
    }
    
    const value = {
        signIn,
        signOut
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}