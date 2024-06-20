import { Post } from "@/models/post"

export type AddReplyResponse = {
    reply?: Post
    err?: string
}