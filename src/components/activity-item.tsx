import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"

import { Activity } from "@/models/activity"
import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { TooltipItem } from "@/components/tooltip-item"
import { UnderlineLink } from "@/components/underline-link"

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    relativeTime: {
        future: "in",
        past: "%s",
        s: '1s',
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1M",
        MM: "%dM",
        y: "1y",
        yy: "%dy"
    }
})

type ActivityItemProps = {
    activity: Activity
}

export function ActivityItem({ activity }: ActivityItemProps) {
    const { user, toggleFollow } = useUser()
    const { push } = useRouter()

    const isFollowing = user?.following.filter(u => u.id == activity.sender?.id)[0]
    const isBeingFollowed = user?.followers.filter(u => u.id == activity.sender?.id)[0]

    async function handleToggleFollow() {
        if (!activity.sender) return

        const response = await toggleFollow(activity.sender?.id)
        if (response.err) {
            if (response.err == "unauthorized" || response.err == "no-token") {
                return push("/auth/signin")
            }

            return toast.error(response.err)
        }
    }

    return (
        <div className="flex justify-between items-center p-5 border-b w-full">
            <div className="flex items-center gap-2">
                {activity.sender && (
                    <Link href={`/app/profile/${activity.sender.username}`}>
                        <UserAvatar user={activity.sender} />
                    </Link>
                )}

                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        {activity.sender && (
                            <UnderlineLink className="hover:border-b-black font-medium text-base text-black" href={`/app/profile/${activity.sender?.username}`}>
                                {activity.sender?.username}
                            </UnderlineLink>
                        )}

                        <span>·</span>

                        <TooltipItem className="cursor-default" tooltip={dayjs(activity.createdAt).format("LLL")}>
                            <span className="border-b border-b-transparent hover:border-b-gray-600 text-gray-600 text-sm transition-all cursor-default">
                                {dayjs().to(activity.createdAt)}
                            </span>
                        </TooltipItem>
                    </div>

                    <span className="text-[15px] text-gray-400">
                        {activity.type == "FOLLOW" && "followed you"}
                        {activity.type == "LIKE_POST" && "liked your post"}
                        {activity.type == "LIKE_REPLY" && "liked your reply"}
                        {activity.type == "REPLY" && (activity.post?.parentPostId ? "replied your comment" : "replied your post")}
                    </span>
                </div>
            </div>

            {activity.type == "FOLLOW" && (
                <Button onClick={handleToggleFollow} variant="outline">
                    {!isFollowing && isBeingFollowed && "Follow back"}
                    {!isFollowing && !isBeingFollowed && "Follow"}
                    {isFollowing && "Unfollow"}
                </Button>
            )}

            {(activity.type == "LIKE_POST" || activity.type == "LIKE_REPLY") && (
                <Link href={`/app/post/${activity.post?.id}`}>
                    <Button variant="outline">
                        View {activity.type == "LIKE_POST" ? "post" : "reply"}
                    </Button>
                </Link>
            )}

            {activity.type == "REPLY" && (
                <Link href={`/app/post/${activity.post?.id}`}>
                    <Button variant="outline">View reply</Button>
                </Link>
            )}
        </div>
    )
}