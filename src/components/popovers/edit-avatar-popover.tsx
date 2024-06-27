"use client"

import { ReactNode } from "react"
import { useImperativeFilePicker } from "use-file-picker"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverItem } from "@/components/popover-item/popover-item"
import { PopoverItemText } from "@/components/popover-item/popover-item-text"
import { PopoverClose } from "@radix-ui/react-popover"

type EditAvatarPopoverProps = {
    onRemove: () => void
    onUpload: (content: string) => void
    children?: ReactNode
}

export function EditAvatarPopover({ onRemove, onUpload, children }: EditAvatarPopoverProps) {
    const { openFilePicker, clear, removeFileByIndex } = useImperativeFilePicker({
        multiple: true,
        accept: "image/*",
        readAs: "DataURL",
        onFilesSuccessfullySelected: data => {
            onUpload(data.filesContent[0].content)
            clear()
        }
    })

    function handleRemove() {
        removeFileByIndex(0)
        onRemove()
    }

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>

            <PopoverContent>
                <PopoverClose asChild>
                    <PopoverItem onClick={openFilePicker}>
                        <PopoverItemText>Upload a new photo</PopoverItemText>
                    </PopoverItem>
                </PopoverClose>

                <PopoverClose asChild>
                    <PopoverItem onClick={handleRemove}>
                        <PopoverItemText className="text-destructive">Remove photo</PopoverItemText>
                    </PopoverItem>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}