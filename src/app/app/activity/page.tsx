"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useUser } from "@/contexts/user-context"
import { useActivity } from "@/contexts/activity-context"
import { LoadingContainer } from "@/components/loading-container"
import { ActivityItem } from "@/components/activity-item"

export default function ActivityPage() {
    const [loading, setLoading] = useState<boolean>(true)

    const { markActivitiesAsRead } = useUser()
    const { activities, loadActivities } = useActivity()
    const { push } = useRouter()

    useEffect(() => {
        loadActivities().then(data => {
            setLoading(false)

            if (data.err) {
                if (data.err == "unauthorized" || data.err == "no-token") {
                    return push("/auth/signin")
                }

                return push("/app/feed")
            }

            markActivitiesAsRead()
        })
    }, [])

    return (
        <div className="flex flex-col">
            {loading && (
                <div className="h-[calc(100vh-56px)]">
                    <LoadingContainer size={32} />
                </div>
            )}

            {activities && activities.map(activity => (
                <ActivityItem
                    key={activity.id}
                    activity={activity}
                />
            ))}
        </div>
    )
}