"use client"

import { FormEvent, ReactNode, useState } from "react"
import { useImperativeFilePicker } from "use-file-picker"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { ImageUp } from "lucide-react"

import { useUser } from "@/contexts/user-context"
import { useFeed } from "@/contexts/feed-context"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { UserAvatar } from "@/components/user-avatar"
import { Textarea } from "@/components/ui/textarea"
import { LoadingButton } from "@/components/loading-button"
import { SelectedImagesDisplay } from "@/components/selected-images-display"

type AddPostDialogProps = {
    children?: ReactNode
}

export function AddPostDialog({ children }: AddPostDialogProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const [files, setFiles] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { user, addPost } = useUser()
    const { feed, setFeed } = useFeed()
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
        const response = await addPost(text, files)
        setLoading(false)

        if (response.err) {
            if (response.err == "unauthorized" || response.err == "no-token") {
                signOut()
                return push("/auth/signin")
            }

            return toast.error(response.err)
        }

        if (response.post && feed) {
            setFeed([response.post, ...feed])
        }

        setOpen(false)
        setText("")
        setFiles([])
        clear()
        toast.success("Your reply is now public.")
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="custom-scroll w-full max-w-[622px] max-h-[900px] overflow-y-scroll">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
                            Post
                        </LoadingButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}