"use client"

import { ReactNode, useState } from "react"
import { ImageUp } from "lucide-react"
import { toast } from "sonner"
import { useImperativeFilePicker } from "use-file-picker"

import { Post } from "@/models/post"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog"
import { UserAvatar } from "@/components/user-avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/loading-button"
import { TooltipItem } from "@/components/tooltip-item"
import { SelectedImageContent } from "../selected-image-content"

type EditPostDialogProps = {
    post: Post
    children?: ReactNode
}

export function EditPostDialog({ post, children }: EditPostDialogProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [text, setText] = useState<string | undefined>(post.text)
    const [files, setFiles] = useState<string[]>(post.files)
    const [loading, setLoading] = useState<boolean>(false)

    const { openFilePicker, removeFileByIndex, clear } = useImperativeFilePicker({
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
            setText(post.text)
            setFiles(post.files)
            clear()
        }

        setOpen(status)
    }

    function handleSelectFiles() {
        openFilePicker()
    }

    function handleRemoveFile(index: number) {
        removeFileByIndex(index)
    }

    async function handleEdit() {
        if (loading) return

        if (text?.trim().length == 0 && files.length == 0) {
            return toast.error("Your post cannot be completely empty.")
        }

        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setLoading(false)

        setOpen(false)
        toast.success("Your post was edited.")

        console.log(text, files)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger className="size-full">{children}</DialogTrigger>

            <DialogContent className="px-0">
                <DialogHeader>
                    <div className="flex items-center gap-3 px-5">
                        <UserAvatar user={post.author} />

                        <div className="flex flex-col">
                            <span className="text-gray-600 text-sm">Editing as</span>
                            <span className="font-semibold">{post.author.name} {post.author.lastName}</span>
                        </div>
                    </div>
                </DialogHeader>

                <Separator />

                <Textarea
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="border-0 px-6 resize-none size-full focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <Separator />

                <div className="flex justify-between items-center px-5">
                    <div className="flex flex-wrap items-center gap-2">
                        <TooltipItem tooltip="Upload images (max: 4)" asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="bg-gray-200 rounded-full cursor-pointer"
                                onClick={handleSelectFiles}
                            >
                                <ImageUp />
                            </Button>
                        </TooltipItem>

                        <div className="flex flex-wrap-reverse items-center gap-4">
                            {files?.map((content, index) => (
                                <SelectedImageContent
                                    key={index}
                                    content={content}
                                    index={index}
                                    onRemove={handleRemoveFile}
                                />
                            ))}
                        </div>
                    </div>

                    <LoadingButton
                        disabled={loading || (text?.trim().length == 0 && files.length == 0)}
                        loading={loading}
                        className="rounded-full"
                        onClick={handleEdit}
                    >Edit</LoadingButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}