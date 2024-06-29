import { api } from "@/services/api-service"
import { EditUserResponse, LoadUserResponse } from "@/responses/user-responses"
import { getToken } from "@/services/token-service"

export async function loadUser(): Promise<LoadUserResponse> {
    try {
        const response = await fetch(`${api}/user`, {
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

export async function editUser(username: string, name: string, description: string | null, avatar: string | null): Promise<EditUserResponse> {
    try {
        const response = await fetch(`${api}/user`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                name,
                description: description,
                avatar: avatar
            })
        })

        const data = await response.json()
        return { user: data.user, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}