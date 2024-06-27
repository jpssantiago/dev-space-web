import { Activity } from "@/models/activity"

export type GetActivitiesResponse = {
    activities?: Activity[]
    err?: string
}