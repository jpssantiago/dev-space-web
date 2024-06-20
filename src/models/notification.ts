import { Post } from "./post"
import { User } from "./user"

export type Notification = {
    id: string
    type: "LIKE_POST" | "LIKE_REPLY" | "FOLLOW" | "REPLY"
    createdAt: Date

    receiver: User
    sender?: User
    post?: Post
}