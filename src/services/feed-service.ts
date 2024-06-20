import { LoadFeedResponse } from "@/responses/feed-responses"

export async function loadFeed(): Promise<LoadFeedResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return {
        feed: []
    }
}