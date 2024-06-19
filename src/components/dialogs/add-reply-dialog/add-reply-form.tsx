"use client"

import { FormEvent, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useImperativeFilePicker } from "use-file-picker"
import { toast } from "sonner"
import { ImageUp, Laugh } from "lucide-react"

import { Post } from "@/models/post"
import { LoadUserResponse } from "@/responses/user-responses"
import { UserAvatar } from "@/components/user-avatar"
import { Textarea } from "@/components/ui/textarea"
import { LoadingButton } from "@/components/loading-button"
import { SelectedFilesDisplay } from "@/components/selected-files-display"

type AddReplyFormProps = {
    post: Post
    onAddReply: () => void
}

export function AddReplyForm({ post, onAddReply }: AddReplyFormProps) {
    const [text, setText] = useState<string>("")
    const [files, setFiles] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { data: response } = useQuery<LoadUserResponse>({
        queryKey: ["user"]
    })

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

    function handleSelectFile() {
        openFilePicker()
    }

    function handleRemoveFile(index: number) {
        removeFileByIndex(index)
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (loading) return
        if (text.trim().length == 0 && files.length == 0) return

        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setLoading(false)

        onAddReply()
        toast.success("Your reply is now public.")
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-2">
                <UserAvatar user={response?.user} className="size-12" />

                <div className="flex flex-col gap-2 w-full">
                    <Textarea
                        placeholder={`Write your reply to ${post.author.name}`}
                        className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0 mt-2 p-0 text-lg"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        // TODO: Grow the text-area and the dialog instead of scroll 🤞
                    />

                    <SelectedFilesDisplay
                        files={files}
                        onRemoveFile={handleRemoveFile}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <ImageUp
                        size={20}
                        className="text-gray-500 hover:text-blue-500 transition-all cursor-pointer"
                        onClick={handleSelectFile}
                    />

                    <Laugh
                        size={20}
                        className="text-gray-500 hover:text-blue-500 transition-all cursor-pointer"
                        onClick={() => alert("select emoji")}
                    />
                </div>

                <LoadingButton
                    loading={loading}
                    disabled={loading || (text.trim().length == 0 && files.length == 0)}
                    className="rounded-full"
                >Reply</LoadingButton>
            </div>
        </form>
    )
}