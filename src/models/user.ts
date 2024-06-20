import { Post } from "./post"
import { Notification } from "./notification"

export type User = {
    id: string
    username: string
    name: string
    avatar: string
    description?: string
    posts: Post[]
    following: User[]
    followers: User[]
    notifications: Notification[]
}