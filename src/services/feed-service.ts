import { LoadFeedResponse } from "@/responses/feed-responses"

export async function loadFeed(): Promise<LoadFeedResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return {
        feed: [
            {
                text: "This is my first post 🚀",
                files: [
                    "https://github.com/jpssantiago.png"
                ],
                author: {
                    id: "0",
                    name: "João",
                    lastName: "Santiago",
                    avatar: "https://github.com/jpssantiago.png",
                },
                createdAt: new Date(2024, 5, 17, 10, 5),
                updatedAt: new Date(2024, 5, 17, 10, 5)
            }, {
                text: "We're making DevSpace from scratch :)",
                files: [],
                author: {
                    id: "1",
                    name: "Mark",
                    lastName: "Zuckerberg",
                    avatar: "https://github.com/diego3g.png"
                },
                createdAt: new Date(2024, 5, 17, 11, 53),
                updatedAt: new Date(2024, 5, 17, 12, 41)
            }
        ]
    }
}