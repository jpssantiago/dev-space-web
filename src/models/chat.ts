import { User } from "./user"

export type Chat = {
    id: string
    createdAt: Date

    users: User[]
}