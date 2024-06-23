import { api } from "@/services/api-service"
import { SignInResponse, SignUpResponse } from "@/responses/auth-responses"

export async function signIn(emailOrUsername: string, password: string): Promise<SignInResponse> {
    try {
        const response = await fetch(`${api}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailOrUsername,
                password
            })
        })

        const data = await response.json()
        return { token: data.token, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}

export async function signUp(email: string, username: string, name: string, password: string): Promise<SignUpResponse> {
    try {
        const response = await fetch(`${api}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                username,
                name,
                password
            })
        })

        const data = await response.json()
        return { token: data.token, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}