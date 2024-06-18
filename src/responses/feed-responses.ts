import { Post } from "@/models/post"

export type LoadFeedResponse = {
    feed?: Post[]
    err?: string
}