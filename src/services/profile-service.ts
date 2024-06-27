import { LoadProfileResponse } from "@/responses/profile-responses"
import { api } from "./api-service"

export async function loadProfile(username: string): Promise<LoadProfileResponse> {
    try {
        const response = await fetch(`${api}/profile/${username}`)
        
        const data = await response.json()
        return { profile: data.profile, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}