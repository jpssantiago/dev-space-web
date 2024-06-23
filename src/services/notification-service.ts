import { GetNotificationsResponse } from "@/responses/notification-responses"
import { getToken } from "@/services/token-service"

export async function getNotifications(): Promise<GetNotificationsResponse> {
    try {
        const response = await fetch("http://localhost:3333/notifications", {
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