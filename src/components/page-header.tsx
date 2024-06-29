"use client"

import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { useUser } from "@/contexts/user-context"
import { usePost } from "@/contexts/post-context"
import { Button } from "@/components/ui/button"

export function PageHeader() {
    const pathname = usePathname()
    const { push } = useRouter()
    const { user } = useUser()
    const { selectedPost } = usePost()

    const username = pathname.split("/profile/")[1]

    return (
        <div className="top-0 z-50 sticky flex justify-center items-center bg-gray-50 dark:bg-[#0A0A0A] phone:px-5 w-full h-12">
            <div className="flex justify-center items-center w-full">
                {pathname == "/app/feed" && "Feed"}

                {pathname == "/app/activity" && "Activity"}

                {pathname.includes("/app/profile") && (
                    <span>
                        {username == user?.username ? "Your profile" : `@${username}`}
                    </span>
                )}
                
                {pathname.includes("/app/post") && (
                    <div className="flex justify-between items-center w-full">
                        <Button 
                            onClick={() => {
                                if (selectedPost?.parentPostId) {
                                    return push(`/app/post/${selectedPost.parentPostId}`)
                                }

                                push("/app/feed")
                            }}
                            className="bg-white hover:bg-gray-200 dark:bg-background border rounded-full text-primary dark:hover:text-gray-400 hover:text-gray-600 size-8" 
                            size="icon"
                        >
                            <ArrowLeft size={16} />
                        </Button>

                        <span>
                            @{selectedPost?.author.username}&apos;s {selectedPost?.parentPostId ? "reply" : "post"}
                        </span>

                        <div className="size-8" />
                    </div>
                )}
            </div>
        </div>
    )
}