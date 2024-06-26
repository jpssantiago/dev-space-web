import { api } from "@/services/api-service"
import { LoadFeedResponse } from "@/responses/feed-responses"

export async function loadFeed(): Promise<LoadFeedResponse> {
    try {
            const response = await fetch(`${api}/feed`)
        
            const data = await response.json()
            return { feed: data.feed, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}