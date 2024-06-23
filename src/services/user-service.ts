import { LoadUserResponse } from "@/responses/user-responses"
import { getToken } from "@/services/token-service"

export async function loadUser(): Promise<LoadUserResponse> {
    try {
        const response = await fetch("http://localhost:3333/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })

        const data = await response.json()
        return { user: data.user, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}