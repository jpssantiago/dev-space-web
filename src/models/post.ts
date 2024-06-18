import { User } from "./user"

export type Post = {
    text?: string
    files: string[]
    author: User
    createdAt: Date
    updatedAt: Date
}