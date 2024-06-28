import { Post } from "./post"
import { Activity } from "./activity"

export type User = {
    id: string
    username: string
    name: string
    avatar?: string
    description?: string

    posts: Post[]

    following: User[]
    followers: User[]

    activities: Activity[]
}