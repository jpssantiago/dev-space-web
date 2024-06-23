import { SignInResponse } from "@/responses/auth-responses"

export async function signIn(emailOrUsername: string, password: string): Promise<SignInResponse> {
    try {
        const response = await fetch("http://localhost:3333/signin", {
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