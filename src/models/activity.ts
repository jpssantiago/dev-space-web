import { Post } from "./post"
import { User } from "./user"

export type Activity = {
    id: string
    type: "FOLLOW" | "LIKE_POST" | "LIKE_REPLY" | "REPLY"
    hasBeenRead: boolean
    createdAt: Date

    user: User

    sender?: User
    post?: Post
}