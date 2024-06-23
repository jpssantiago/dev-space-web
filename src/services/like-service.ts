import { api } from "@/services/api-service"
import { ToggleLikeResponse } from "@/responses/like-responses"
import { getToken } from "@/services/token-service"

export async function toggleLike(postId: string): Promise<ToggleLikeResponse> {
    try {
        const response = await fetch(`${api}/like/${postId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            }
        })

        const data = await response.json()
        return { like: data.like, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}