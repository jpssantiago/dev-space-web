"use client"

import { useState, useEffect } from "react"

import { Notification } from "@/models/notification"
import { useUser } from "@/contexts/user-context"
import { getNotifications } from "@/services/notification-service"
import { NotificationItem } from "@/components/notification-item"

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[] | undefined>(undefined)

    const { user } = useUser()

    useEffect(() => {
        getNotifications().then(data => setNotifications(data.notifications))
    }, [])

    return (
        <div className="h-[calc(100vh-56px)]">
            {!notifications && <h1>Loading...</h1>}

            {notifications && notifications.map(notification => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                />
            ))}
        </div>
    )
}