import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/models/user"

type UserAvatarProps = {
    user?: User
    className?: string
}

export function UserAvatar({ user, className }: UserAvatarProps) {
    return (
        <Avatar className={className}>
            <AvatarImage src={user?.avatar} />

            <AvatarFallback>
                {user?.name.slice(0, 1)}{user?.lastName.slice(0, 1)}
            </AvatarFallback>
        </Avatar>
    )
}