import { Follow } from "@/models/follow"

export type ToggleFollowResponse = {
    follow?: Follow
    err?: string
}