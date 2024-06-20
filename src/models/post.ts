import { User } from "./user"

export type Post = {
    id: string
    text?: string
    files: string[]
    author: User
    createdAt: Date
    
    likes: User[]
    replies: Post[]
}