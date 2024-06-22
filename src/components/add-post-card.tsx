"use client"

import { FormEvent, useState, createRef } from "react"
import { useImperativeFilePicker } from "use-file-picker"
import { toast } from "sonner"
import { ImageUp, Laugh } from "lucide-react"
import { useRouter } from "next/navigation"

import { useUser } from "@/contexts/user-context"
import { useFeed } from "@/contexts/feed-context"
import { UserAvatar } from "@/components/user-avatar"
import { Textarea } from "@/components/ui/textarea"
import { LoadingButton } from "@/components/loading-button"
import { SelectedFilesDisplay } from "@/components/selected-files-display"

export function AddPostCard() {
    const [text, setText] = useState<string>("")
    const [files, setFiles] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { user, addPost } = useUser()
    const { feed, setFeed } = useFeed()
    const { push } = useRouter()

    const textAreaRef = createRef<HTMLTextAreaElement>()

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

    if (!user) {
        return <div />
    }

    function handleSelectFile() {
        openFilePicker()
    }

    function handleRemoveFile(index: number) {
        removeFileByIndex(index)
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
                return push("/auth/sign-in")
            }

            return toast.error(response.err)
        }

        toast.success("Your post is now public.")
        setText("")
        setFiles([])
        clear()

        if (feed && response.post) {
            setFeed([response.post, ...feed])
        }

        if (textAreaRef.current) {
            textAreaRef.current.style.height = "28px"
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-5 py-2 border-b">
            <div className="flex gap-2">
                <UserAvatar user={user} />

                <div className="flex flex-col gap-2 w-full">
                    <Textarea
                        ref={textAreaRef}
                        className="border-0 mt-2 p-0 min-h-[28px] text-lg resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder={`What's on your mind, ${user.name}?`}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onInput={(event) => {
                            const textarea = event.currentTarget
                            textarea.style.height = "auto"
                            textarea.style.height = `${textarea.scrollHeight}px`
                        }}
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
                    disabled={loading || ( text.trim().length == 0 && files.length == 0)}
                    className="rounded-full w-fit"
                >Post</LoadingButton>
            </div>
        </form>
    )
}