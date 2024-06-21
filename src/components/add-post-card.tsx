"use client"

import { FormEvent, useState } from "react"

import { useUser } from "@/contexts/user-context"
import { UserAvatar } from "./user-avatar"
import { Textarea } from "./ui/textarea"
import { LoadingButton } from "./loading-button"

export function AddPostCard() {
    const [text, setText] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const { user } = useUser()

    if (!user) {
        return <div />
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        if (loading) return
        if (text.trim().length == 0) return

        event.preventDefault()

        fetch("http://localhost:3333/post", {
            method: "POST",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNseG5pZmRlODAwMDBnd3FqMG15a2hvMzkiLCJpYXQiOjE3MTg5MDQzNTMsImV4cCI6MTcxOTUwOTE1M30.eQ3Zbxd0_2UCdM_pbT__I9GDAyM9eurkCGhWntlUe-g",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text, files: [] })
        }).then(response => {
            response.json().then(data => {
                console.log(data)
            })
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-5 py-2 border-b">
            <div className="flex gap-2">
                <UserAvatar user={user} />

                <Textarea
                    className="resize-none"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </div>

            <div className="flex justify-end w-full">
                <LoadingButton 
                    loading={loading} 
                    disabled={loading || text.trim().length == 0} 
                    className="w-fit"
                >send</LoadingButton>
            </div>
        </form>
    )
}