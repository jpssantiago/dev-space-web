import { User } from "@/models/user"

export type LoadProfileResponse = {
    profile?: User
    err?: string
}