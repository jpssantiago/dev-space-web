import { LoadUserResponse } from "@/responses/user-responses"

export async function loadUser(): Promise<LoadUserResponse> {
    await new Promise(resolve => setTimeout(resolve, 750))

    return {
        user: {
            id: "0",
            name: "João",
            lastName: "Santiago",
            avatar: "https://github.com/jpssantiago.png"
        }
    }
}