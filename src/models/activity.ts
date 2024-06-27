import { Post } from "./post"
import { User } from "./user"

export type Activity = {
    id: string
    type: "FOLLOW" | "LIKE_POST" | "LIKE_REPLY" | "REPLY"
    createdAt: Date

    user: User

    sender?: User
    post?: Post
}