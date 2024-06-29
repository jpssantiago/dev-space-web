"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CircleEllipsisIcon } from "lucide-react"

import { useUser } from "@/contexts/user-context"
import { useProfile } from "@/contexts/profile-context"
import { useAuth } from "@/contexts/auth-context"
import { LoadingContainer } from "@/components/loading-container"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { EditProfileDialog } from "@/components/dialogs/edit-profile-dialog"
import { ProfilePageTabs } from "@/components/profile-page-tabs"
import { ProfilePageTab } from "@/components/profile-page-tab"
import { PostCard } from "@/components/cards/post-card"

type UserProfilePageProps = {
    params: {
        username: string
    }
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
    const [loading, setLoading] = useState<boolean>(true)
    const [tab, setTab] = useState<"posts" | "replies">("posts")

    const { user, toggleFollow } = useUser()
    const { profile, setProfile, loadProfile } = useProfile()
    const { signOut } = useAuth()
    const { push } = useRouter()

    const posts = profile?.posts.filter(p => !p.parentPostId)
    const replies = profile?.posts.filter(p => p.parentPostId)

    const isFollowing = (profile?.followers.filter(u => u.id == user?.id) ?? []).length > 0
    const isBeingFollowed = (user?.followers.filter(u => u.id == profile?.id) ?? []).length > 0

    useEffect(() => {
        loadProfile(params.username).then(response => {
            setLoading(false)

            if (response.err) {
                return push("/app/feed")
            }
        })
    }, [])

    if (loading) {
        return (
            <div className="h-[calc(100vh-56px)]">
                <LoadingContainer size={32} />
            </div>
        )
    }

    async function handleToggleFollow() {
        if (!profile) return
        if (profile.id == user?.id) return
        if (!user) return

        const response = await toggleFollow(profile.id)
        if (response.err) {
            if (response.err == "unauthorized" || response.err == "no-token") {
                signOut()
                push("/auth/signin")
            }

            return toast.error(response.err)
        }

        if (isFollowing) {
            setProfile({
                ...profile,
                followers: profile.followers.filter(u => u.id != user?.id)  
            })
        } else {
            setProfile({
                ...profile,
                followers: [...profile.followers, user]  
            })
        }
    }

    return (
        <div className="flex flex-col gap-3 pt-5 text-[15px]">
            <div className="flex justify-between items-center px-5">
                <div className="flex flex-col">
                    <span className="font-semibold text-2xl">{profile?.name}</span>
                    <span className="text-gray-800 text-sm dark:text-zinc-200">@{profile?.username}</span>
                </div>

                <UserAvatar user={profile} className="size-24" />
            </div>

            <div className="flex justify-between items-center px-5">
                <div className="flex flex-col">
                    {profile?.description && (
                        <span className="text-gray-600 dark:text-zinc-400">
                            {profile.description}
                        </span>
                    )}

                    <span className="text-gray-600 dark:text-zinc-400">
                        {profile?.followers.length} {profile?.followers.length == 1 ? "follower" : "followers"}
                    </span>
                </div>

                {user?.id != profile?.id && (
                    <CircleEllipsisIcon
                        size={22}
                        className="hover:text-blue-500 dark:hover:text-blue-500 dark:text-zinc-400 transition-all cursor-pointer"
                    />
                )}
            </div>

            {user?.id == profile?.id ? (
                <EditProfileDialog>
                    <Button className="mx-5" variant="outline">
                        Edit profile
                    </Button>
                </EditProfileDialog>
            ) : (
                <Button className="mx-5" onClick={handleToggleFollow}>
                    {!isFollowing && isBeingFollowed && "Follow back"}
                    {!isFollowing && !isBeingFollowed && "Follow"}
                    {isFollowing && "Unfollow"}
                </Button>
            )}

            <div className="flex flex-col">
                <ProfilePageTabs>
                    <ProfilePageTab selectedTab={tab} tab="posts" onSelect={setTab}>Posts</ProfilePageTab>
                    <ProfilePageTab selectedTab={tab} tab="replies" onSelect={setTab}>Replies</ProfilePageTab>
                </ProfilePageTabs>

                {tab == "posts" && (
                    <>
                        {posts?.length == 0 && (
                            <div className="flex justify-center items-center mt-[50%] w-full">
                                <span className="text-gray-500 text-sm">No posts yet.</span>
                            </div>
                        )}

                        {posts?.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </>
                )}

                {tab == "replies" && (
                    <>
                        {replies?.length == 0 && (
                            <div className="flex justify-center items-center mt-[50%] w-full">
                                <span className="text-gray-500 text-sm">No replies yet.</span>
                            </div>
                        )}

                        {replies?.map(reply => (
                            <PostCard key={reply.id} post={reply} />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}