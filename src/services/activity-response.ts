import { GetActivitiesResponse } from "@/responses/activity-responses"
import { api } from "./api-service"
import { getToken } from "./token-service"

export async function getActivities(): Promise<GetActivitiesResponse> {
    try {
        const response = await fetch(`${api}/activities`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })

        const data = await response.json()
        return { activities: data.activities, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}