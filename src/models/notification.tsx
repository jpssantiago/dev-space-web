import { Post } from "./post"
import { User } from "./user"

export type Notification = {
    id: string
    type: "like_post" | "like_reply" | "follow" | "reply"
    sender?: User
    post?: Post
}