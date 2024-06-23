import { api } from "@/services/api-service"
import { AddPostResponse, AddReplyResponse, DeletePostResponse, GetPostResponse } from "@/responses/post-responses"
import { getToken } from "@/services/token-service"

export async function addPost(text?: string, files?: string[]): Promise<AddPostResponse> {
    try {
        const response = await fetch(`${api}/post`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
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
        const response = await fetch(`${api}/post/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${getToken()}`
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
        const response = await fetch(`${api}/${postId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
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

export async function getPost(postId: string): Promise<GetPostResponse> {
    try {
        const response = await fetch(`${api}/post/${postId}`)

        const data = await response.json()
        return { post: data.post, err: data.err }
    } catch {
        return { err: "server-not-responding" }
    }
}