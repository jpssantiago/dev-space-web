"use client"

import { FormEvent, ReactNode, useState } from "react"
import { useImperativeFilePicker } from "use-file-picker"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { toast } from "sonner"
import { ImageUp } from "lucide-react"

import { Post } from "@/models/post"
import { useUser } from "@/contexts/user-context"
import { useFeed } from "@/contexts/feed-context"
import { usePost } from "@/contexts/post-context"
import { useProfile } from "@/contexts/profile-context"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { UserAvatar } from "@/components/user-avatar"
import { Textarea } from "@/components/ui/textarea"
import { LoadingButton } from "@/components/loading-button"
import { SelectedImagesDisplay } from "@/components/selected-images-display"

dayjs.extend(relativeTime)

type AddReplyDialogProps = {
    post: Post
    children?: ReactNode
}

export function AddReplyDialog({ post, children }: AddReplyDialogProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const [files, setFiles] = useState<string[]>([])

    const { user, addReply } = useUser()
    const { feed, setFeed } = useFeed()
    const { selectedPost, setSelectedPost } = usePost()
    const { profile, setProfile } = useProfile()
    const { signOut } = useAuth()
    const { push } = useRouter()
    const { openFilePicker, clear, removeFileByIndex } = useImperativeFilePicker({
        multiple: true,
        accept: "image/*",
        readAs: "DataURL",
        onFilesSuccessfullySelected: data => {
            const allowed = 4 - files.length
            if (data.filesContent.length > allowed) {
                clear()
                return toast.error("The maximum amount of images is 4.")
            }

            setFiles([...files, ...data.filesContent.map(file => file.content)])
            clear()
        },
        onFileRemoved: (_, index) => {
            setFiles(files?.filter((_, i) => i != index))
        }
    })

    function handleOpenChange(status: boolean) {
        if (loading) return

        if (!status) {
            setText("")
            setFiles([])
            clear()
        }

        setOpen(status)
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (loading) return
        if (text.trim().length == 0 && files.length == 0) return

        setLoading(true)
        const response = await addReply(post.id, text, files)
        setLoading(false)

        if (response.err) {
            if (response.err == "unauthorized" || response.err == "no-token") {
                signOut()
                push("/auth/signin")
            }

            return toast.error(response.err)
        }

        setFeed(feed?.map(p => {
            if (p.id == post.id) {
                p.replies = [response.reply!, ...p.replies]
            }

            return p
        }))

        if (selectedPost) {
            if (selectedPost.id == post.id) {
                setSelectedPost({
                    ...selectedPost,
                    replies: [response.reply!, ...selectedPost.replies]
                })
            } else if (selectedPost.id == post.parentPostId) {
                setSelectedPost({
                    ...selectedPost,
                    replies: selectedPost.replies.map(reply => {
                        if (reply.id == post.id) {
                            reply.replies.push(response.reply!)
                        }
                        
                        return reply
                    })
                })
            }
        }

        if (profile) {
            setProfile({
                ...profile,
                posts: profile.posts.map(p => {
                    if (p.id == post.id) {
                        p.replies = [response.reply!, ...p.replies]
                    }
                    
                    return p
                })
            })
        }

        setOpen(false)
        setText("")
        setFiles([])
        clear()
        toast.success("The reply was added to the feed.")
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger>{children}</DialogTrigger>

            <DialogContent className="custom-scroll max-w-[622px] max-h-[900px] overflow-y-scroll">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <div className="flex flex-col items-center gap-2">
                            <UserAvatar user={post.author} />

                            <div className="bg-gray-300 rounded-full w-[2px] h-full min-h-[30px]" />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="font-medium">@{post.author.username}</span>

                                <span>·</span>

                                <span className="text-gray-600 text-sm dark:text-zinc-400 cursor-default">
                                    {dayjs().to(post.createdAt)}
                                </span>
                            </div>

                            <span className="text-[15px] text-gray-800 dark:text-zinc-200 break-words whitespace-pre-line">
                                {post.text}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <UserAvatar user={user} />

                        <div className="flex flex-col w-full">
                            <span className="font-medium">@{user?.username}</span>

                            <Textarea
                                placeholder={`What's on your mind, ${user?.name}?`}
                                className="border-0 mt-2 p-0 rounded-none w-full text-sm resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[28px] leading-[14px]"
                                value={text}
                                onChange={e => setText(e.target.value)}
                                onInput={(event) => {
                                    const textarea = event.currentTarget
                                    textarea.style.height = "auto"
                                    textarea.style.height = `${textarea.scrollHeight}px`
                                }}
                            />

                            <SelectedImagesDisplay
                                files={files}
                                onRemove={removeFileByIndex}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <ImageUp
                            size={20}
                            className="text-gray-600 hover:text-blue-500 transition-all cursor-pointer"
                            onClick={openFilePicker}
                        />

                        <LoadingButton
                            loading={loading}
                            className="rounded-full"
                            disabled={loading || (text.trim().length == 0 && files.length == 0)}
                        >
                            Reply
                        </LoadingButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}