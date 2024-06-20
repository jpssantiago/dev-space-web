import { Post } from "./post"
import { User } from "./user"

export type Like = {
    id: string
    createdAt: Date
    user: User
    post: Post
}