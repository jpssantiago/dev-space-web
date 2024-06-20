"use client"

import { useQuery } from "@tanstack/react-query"

import { LoadUserResponse } from "@/responses/user-responses"
import { NotificationItem } from "@/components/notification-item"

export default function NotificationsPage() {
    const { data: response } = useQuery<LoadUserResponse>({ queryKey: ["user"] })

    return (
        <div className="h-screen">
            {response?.user?.notifications.map(notification => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                />
            ))}
        </div>
    )
}