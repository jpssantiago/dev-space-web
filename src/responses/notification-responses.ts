import { Notification } from "@/models/notification"

export type GetNotificationsResponse = {
    notifications?: Notification[]
    err?: string
}