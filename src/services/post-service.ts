import { AddPostResponse, AddReplyResponse, DeletePostResponse } from "@/responses/post-responses"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNseG5pZmRlODAwMDBnd3FqMG15a2hvMzkiLCJpYXQiOjE3MTg5MDQzNTMsImV4cCI6MTcxOTUwOTE1M30.eQ3Zbxd0_2UCdM_pbT__I9GDAyM9eurkCGhWntlUe-g"

export async function addPost(text?: string, files?: string[]): Promise<AddPostResponse> {
    try {
        const response = await fetch("http://localhost:3333/post", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text,
                files
            })
        })

        const data = await response.json()
        return { post: data.post, err: data.err || data.error }
    } catch {
        return { err: "server-not-responding" }
    }
}

export async function deletePost(postId: string): Promise<DeletePostResponse> {
    try {
        const response = await fetch(`http://localhost:3333/post/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await response.json()
        return { deleted: data.deleted, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}

export async function addReply(postId: string, text?: string, files?: string[]): Promise<AddReplyResponse> {
    try {
        const response = await fetch(`http://localhost:3333/post/${postId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text,
                files
            })
        })

        const data = await response.json()
        return { reply: data.reply, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}