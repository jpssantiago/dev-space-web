import { Post } from "@/models/post"
import { User } from "@/models/user"
import { LoadUserResponse } from "@/responses/user-responses"

const zuck: User = {
    id: "1",
    username: "zuck",
    name: "Mark (zuck) Zuckerberg",
    avatar: "https://github.com/diego3g.png",
    description: "Founder @ Meta",
    posts: [],
    followers: [],
    following: [],
    notifications: []
}

const post1: Post = {
    id: "0",
    author: {
        id: "0",
        username: "iamjoaosantiago",
        name: "João Santiago",
        avatar: "https://github.com/jpssantiago.png",
        description: "Founder @ DevSpace",
        posts: [],
        followers: [],
        following: [],
        notifications: []
    },
    text: "It looks like DevSpace is working fine!",
    createdAt: new Date(2024, 5, 19, 18, 52, 30),
    files: [],
    likes: [],
    replies: []
}

const reply1: Post = {
    id: "1",
    author: {
        id: "0",
        username: "iamjoaosantiago",
        name: "João Santiago",
        avatar: "https://github.com/jpssantiago.png",
        description: "Founder @ DevSpace",
        posts: [post1],
        followers: [],
        following: [],
        notifications: []
    },
    text: "Testing the reply... 🤞",
    createdAt: new Date(2024, 5, 19, 18, 52, 30),
    files: [],
    likes: [],
    replies: []
}

const reply2: Post = {
    id: "2",
    author: zuck,
    text: "It's working, mate. Good job 👊💪",
    createdAt: new Date(2024, 5, 19, 18, 52, 30),
    files: [],
    likes: [],
    replies: []
}

const iamjoaosantiago: User = {
    id: "0",
    username: "iamjoaosantiago",
    name: "João Santiago",
    avatar: "https://github.com/jpssantiago.png",
    description: "Founder @ DevSpace",
    posts: [post1],
    followers: [],
    following: [],
    notifications: [
        {
            id: "0",
            sender: zuck,
            type: "like_post",
            post: post1
        },
        {
            id: "1",
            sender: zuck,
            type: "like_reply",
            post: reply1
        },
        {
            id: "2",
            sender: zuck,
            type: "follow"
        },
        {
            id: "3",
            sender: zuck,
            type: "reply",
            post: reply2
        }
    ]
}

export async function loadUser(): Promise<LoadUserResponse> {
    await new Promise(resolve => setTimeout(resolve, 750))

    return {
        user: iamjoaosantiago
    }
}