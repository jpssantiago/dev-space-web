"use client"

import { ReactNode, createContext, useContext } from "react"

import { SignInResponse } from "@/responses/auth-responses"
import * as AuthService from "@/services/auth-service"
import * as TokenService from "@/services/token-service"

type AuthContextType = {
    signIn: (emailOrUsername: string, password: string) => Promise<SignInResponse>
}

const AuthContext = createContext({} as AuthContextType)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
    async function signIn(emailOrUsername: string, password: string): Promise<SignInResponse> {
        const response = await AuthService.signIn(emailOrUsername, password)
        
        if (response.token) {
            TokenService.setToken(response.token)
        }
        
        return response
    }
    
    const value = {
        signIn
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}