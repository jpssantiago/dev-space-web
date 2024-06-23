"use client"

import { useRouter } from "next/navigation"

import { useUser } from "@/contexts/user-context"

export default function ProfilePage() {
    const { user } = useUser()
    const { push } = useRouter()

    if (!user) {
        return push("/app/feed")
    }

    push(`/app/profile/${user.username}`)
}