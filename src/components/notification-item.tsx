"use client"

import { useRouter } from "next/navigation"
import { Heart, MessageCircle, Users } from "lucide-react"

import { Notification } from "@/models/notification"

type NotificationItemProps = {
    notification: Notification
}

export function NotificationItem({ notification }: NotificationItemProps) {
    const { push } = useRouter()
    
    function handleClick() {
        if (notification.post) {
            return push(`/app/post/${notification.post.id}`)
        }
        
        if (notification.sender) {
            return push(`/app/post/${notification.sender.username}`)
        }
    }

    return (
        <div 
            className={`flex ${notification.type == "follow" ? "items-center" : "items-start"} gap-2 px-5 py-2 border-b text-[15px] hover:bg-gray-100 transition-all cursor-pointer`}
            onClick={handleClick}
        >
            <div className="flex justify-center items-center bg-blue-100 rounded-full size-9">
                {notification.type == "follow" && <Users size={20} className="text-blue-500" />}
                {notification.type == "like_post" && <Heart size={20} className="text-blue-500" />}
                {notification.type == "like_reply" && <Heart size={20} className="text-blue-500" />}
                {notification.type == "reply" && <MessageCircle size={20} className="text-blue-500" />}
            </div>

            <div className="flex flex-col">
                {notification.sender && (
                    <>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">{notification.sender.name}</span>
                            {notification.type == "follow" && <span>followed you</span>}
                            {notification.type == "like_post" && <span>liked your post</span>}
                            {notification.type == "like_reply" && <span>liked your reply</span>}
                            {notification.type == "reply" && <span>replied you</span>}
                        </div>

                        {notification.post && (
                            <span className="text-gray-500 text-sm">
                                {notification.post.text}
                            </span>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}