import { Like } from "@/models/like"

export type ToggleLikeResponse = {
    like?: Like
    err?: string
}