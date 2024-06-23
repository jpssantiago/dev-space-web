"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

import { Post } from "@/models/post"
import { LoadFeedResponse } from "@/responses/feed-responses"
import * as FeedService from "@/services/feed-service"

type FeedContextType = {
    feed: Post[] | undefined
    setFeed: Dispatch<SetStateAction<Post[] | undefined>>
    loadFeed: () => Promise<LoadFeedResponse>
}

export const FeedContext = createContext({} as FeedContextType)

export function useFeed() {
    return useContext(FeedContext)
}

export function FeedProvider({ children }: { children: ReactNode }) {
    const [feed, setFeed] = useState<Post[] | undefined>([])

    async function loadFeed(): Promise<LoadFeedResponse> {
        const response = await FeedService.loadFeed()

        setFeed(response.feed)

        return response
    }

    const value = {
        feed,
        setFeed,
        loadFeed
    }
    
    return (
        <FeedContext.Provider value={value}>
            {children}
        </FeedContext.Provider>
    )
}