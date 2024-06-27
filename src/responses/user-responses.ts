import { User } from "@/models/user"

export type LoadUserResponse = {
    user?: User
    err?: string
}

export type EditUserResponse = {
    user?: User
    err?: string
}