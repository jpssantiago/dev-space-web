import { ToggleFollowResponse } from "@/responses/follow-responses"
import { api } from "@/services/api-service"
import { getToken } from "@/services/token-service"

export async function toggleFollow(followedId: string): Promise<ToggleFollowResponse> {
    try {
        const response = await fetch(`${api}/follow/${followedId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })

        const data = await response.json()
        return { follow: data.follow, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}