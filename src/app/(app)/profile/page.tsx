"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useUser } from "@/contexts/user-context"

export default function ProfilePage() {
    const { user } = useUser()
    const { push } = useRouter()

    useEffect(() => {
        if (user) {
            return push(`/profile/${user.username}`)
        }

        push("/feed")
    }, [])
}