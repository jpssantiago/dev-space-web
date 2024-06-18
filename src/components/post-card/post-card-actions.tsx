import { Heart, MessageCircle, Link } from "lucide-react"

import { Post } from "@/models/post"
import { PostCardAction } from "./post-card-action"
import { AddCommentDialog } from "@/components/dialogs/add-comment-dialog"
import { SharePostDialog } from "@/components/dialogs/share-post-dialog"

type PostCardActionsProps = {
    post: Post
}

export function PostCardActions({ post }: PostCardActionsProps) {
    return (
        <div className="flex justify-between items-center w-full h-fit -translate-x-2">
                <PostCardAction
                    icon={Heart}
                    className="group-hover:bg-blue-100 group-hover:text-blue-500"
                >4,5K</PostCardAction>

                <AddCommentDialog>
                    <PostCardAction 
                        icon={MessageCircle} 
                        className="group-hover:bg-green-100 group-hover:text-green-600"
                    >79</PostCardAction>
                </AddCommentDialog>

                <SharePostDialog>
                    <PostCardAction 
                        icon={Link} 
                        className="group-hover:bg-purple-100 group-hover:text-purple-500"
                    >Share</PostCardAction>
                </SharePostDialog>
        </div>
    )
}