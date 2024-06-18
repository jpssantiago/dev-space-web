import { LoadFeedResponse } from "@/responses/feed-responses"

export async function loadFeed(): Promise<LoadFeedResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return {
        feed: [
            {
                id: "0",
                text: "This is my first post 🚀",
                files: [],
                author: {
                    id: "0",
                    username: "iamjoaosantiago",
                    name: "João Santiago",
                    avatar: "https://github.com/jpssantiago.png",
                    description: "Founder @ DevSpace",
                    followers: [],
                    following: []
                },
                createdAt: new Date(2024, 5, 17, 10, 5),
                updatedAt: new Date(2024, 5, 17, 10, 5)
            }, {
                id: "1",
                text: "We're making DevSpace from scratch :)",
                files: ["https://pbs.twimg.com/media/GQUyX5gXUAA5MX0?format=jpg&name=small"],
                author: {
                    id: "1",
                    username: "zuck",
                    name: "Mark (zuck) Zuckerberg",
                    avatar: "https://github.com/diego3g.png",
                    description: "Founder @ Meta",
                    followers: [],
                    following: []
                },
                createdAt: new Date(2024, 5, 17, 11, 53),
                updatedAt: new Date(2024, 5, 17, 12, 41)
            }, {
                id: "2",
                text: "Haha, its working",
                files: ["https://github.com/jpssantiago.png"],
                author: {
                    id: "0",
                    username: "iamjoaosantiago",
                    name: "João Santiago",
                    avatar: "https://github.com/jpssantiago.png",
                    description: "Founder @ DevSpace",
                    followers: [],
                    following: []
                },
                createdAt: new Date(2024, 5, 17, 19, 3),
                updatedAt: new Date(2024, 5, 17, 19, 3)
            }
        ]
    }
}