import { LoadUserResponse } from "@/responses/user-responses"

export async function loadUser(): Promise<LoadUserResponse> {
    await new Promise(resolve => setTimeout(resolve, 750))

    return {
        user: {
            id: "0",
            username: "iamjoaosantiago",
            name: "João Santiago",
            avatar: "https://github.com/jpssantiago.png",
            description: "Founder @ DevSpace",
            followers: [],
            following: []
        }
    }
}