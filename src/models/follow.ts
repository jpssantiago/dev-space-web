import { User } from "./user"

export type Follow = {
    id: string
    createdAt: Date

    following: User
    
    followed: User
}