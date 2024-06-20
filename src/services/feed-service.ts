import { LoadFeedResponse } from "@/responses/feed-responses"

export async function loadFeed(): Promise<LoadFeedResponse> {
    const response = await fetch("http://localhost:3333/feed")

    const data = await response.json()
    return { feed: data.feed, err: data.err }
}