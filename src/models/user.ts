export type User = {
    id: string
    username: string
    name: string
    avatar: string
    description?: string
    following: User[]
    followers: User[]
}