import { X } from "lucide-react"

type SelectImageContentProps = {
    content: string
    index: number
    onRemove: (index: number) => void
}

export function SelectedImageContent({ content, index, onRemove, }: SelectImageContentProps) {
    return (
        <div className="relative bg-gray-200 rounded-lg w-16 h-10">
            <img
                src={content}
                alt=""
                className="rounded-lg object-fil size-full"
            />

            <div 
                className="-top-2 -right-2 absolute flex justify-center items-center bg-primary hover:bg-gray-400 rounded-full transition-all cursor-pointer size-5"
                onClick={() => onRemove(index)}
            >
                <X size={16} className="text-white" />
            </div>
        </div>
    )
}