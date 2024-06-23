import { api } from "@/services/api-service"
import { GetNotificationsResponse } from "@/responses/notification-responses"
import { getToken } from "@/services/token-service"

export async function getNotifications(): Promise<GetNotificationsResponse> {
    try {
        const response = await fetch(`${api}/notifications`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            }
        })

        const data = await response.json()
        return { notifications: data.notifications, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}