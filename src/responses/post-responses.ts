import { Post } from "@/models/post"

export type DeletePostResponse = {
    deleted?: boolean
    err?: string
}

export type AddReplyResponse = {
    reply?: Post
    err?: string
}