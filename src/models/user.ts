export type User = {
    id: string
    username: string
    name: string
    lastName: string
    avatar: string
    description?: string
    following: User[]
    followers: User[]
}