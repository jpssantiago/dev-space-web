import { GetNotificationsResponse } from "@/responses/notification-responses"

export async function getNotifications(): Promise<GetNotificationsResponse> {
    try {
        const response = await fetch("http://localhost:3333/notifications", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNseG5pZmRlODAwMDBnd3FqMG15a2hvMzkiLCJpYXQiOjE3MTg5MDQzNTMsImV4cCI6MTcxOTUwOTE1M30.eQ3Zbxd0_2UCdM_pbT__I9GDAyM9eurkCGhWntlUe-g"
            }
        })

        const data = await response.json()
        return { notifications: data.notifications, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}