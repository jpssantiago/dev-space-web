"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Activity } from "@/models/activity"
import { getActivities } from "@/services/activity-response"
import { LoadingContainer } from "@/components/loading-container"
import { ActivityItem } from "@/components/activity-item/activity-item"

export default function ActivityPage() {
    const [loading, setLoading] = useState<boolean>(true)
    const [activities, setActivities] = useState<Activity[] | undefined>(undefined)

    const { push } = useRouter()

    useEffect(() => {
        getActivities().then(data => {
            setLoading(false)

            if (data.err) {
                if (data.err == "unauthorized" || data.err == "no-token") {
                    return push("/auth/sign-in")
                }

                return push("/app/feed")
            }

            setActivities(data.activities)
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