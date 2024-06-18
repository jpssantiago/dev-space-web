import { User } from "./user"

export type Post = {
    id: string
    text?: string
    files: string[]
    author: User
    createdAt: Date
    updatedAt: Date
    
    likes: User[]
    comments: string[] // TComment[]
}