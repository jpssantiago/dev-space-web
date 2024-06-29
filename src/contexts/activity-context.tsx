"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

import { Activity } from "@/models/activity"
import { GetActivitiesResponse } from "@/responses/activity-responses"
import * as ActivityService from "@/services/activity-response"

type ActivityContextType = {
    activities: Activity[] | undefined
    setActivities: Dispatch<SetStateAction<Activity[] | undefined>>
    loadActivities: () => Promise<GetActivitiesResponse>
}

export const ActivityContext = createContext({} as ActivityContextType)

export function useActivity() {
    return useContext(ActivityContext)
}

export function ActivityProvider({ children }: { children?: ReactNode }) {
    const [activities, setActivities] = useState<Activity[] | undefined>(undefined)

    async function loadActivities(): Promise<GetActivitiesResponse> {
        const response = await ActivityService.getActivities()
        setActivities(response.activities)
        return response
    }

    const value = {
        activities,
        loadActivities,
        setActivities
    }
    
    return (
        <ActivityContext.Provider value={value}>
            {children}
        </ActivityContext.Provider>
    )
}