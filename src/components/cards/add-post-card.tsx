"use client"

import { useUser } from "@/contexts/user-context"
import { AddPostDialog } from "@/components/dialogs/add-post-dialog"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"

export function AddPostCard() {
    const { user } = useUser()

    return (
        <AddPostDialog>
            <div className="flex justify-between items-center p-5 border-b cursor-pointer group">
                <div className="flex items-center gap-2">
                    <UserAvatar user={user} />

                    <span className="group-hover:text-primary w-full font-light text-gray-500 text-sm dark:text-zinc-400 transition-all">
                        What&apos;s on your mind, {user?.name}?
                    </span>
                </div>

                <Button className="rounded-full" variant="outline">
                    Post
                </Button>
            </div>
        </AddPostDialog>
    )
}