import { User } from "./user"

export type Post = {
    id: string
    text?: string
    files: string[]
    createdAt: Date

    author: User
    likes: User[]
    replies: Post[]
}