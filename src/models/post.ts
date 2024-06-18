import { User } from "./user"

export type Post = {
    text?: string
    file?: string
    author: User
    createdAt: Date
    updatedAt: Date
}