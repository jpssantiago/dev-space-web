import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"

type SelectedImagesDisplayProps = {
    files: string[]
    onRemove: (index: number) => void
}

export function SelectedImagesDisplay({ files, onRemove }: SelectedImagesDisplayProps) {
    if (files.length == 0) return <></>

    if (files.length == 1) {
        return (
            <div className="relative flex">
                <img
                    src={files[0]}
                    alt=""
                    className="border rounded-lg size-[516px]"
                />

                <Button
                    size="icon"
                    className="top-1 right-1 absolute bg-primary/90 rounded-full hover:text-gray-400 size-8"
                    onClick={() => onRemove(0)}
                >
                    <X />
                </Button>
            </div>
        )
    }

    return (
        <Carousel>
            <CarouselContent>
                {files.map((file, index) => (
                    <CarouselItem key={index} className="basis-1/2">
                        <div className="relative h-[290px]">
                            <img
                                src={file}
                                className="border rounded-lg object-cover size-full"
                                alt=""
                            />

                            <Button
                                size="icon"
                                className="top-1 right-1 absolute bg-primary/90 rounded-full hover:text-gray-400 size-8"
                                onClick={() => onRemove(index)}
                            >
                                <X />
                            </Button>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            
            {files.length > 2 && (
                <>
                    <CarouselPrevious className="border-0 bg-primary hover:bg-gray-700 text-white hover:text-gray-300 translate-x-8" />
                    <CarouselNext className="border-0 bg-primary hover:bg-gray-700 text-white hover:text-gray-300 -translate-x-8" />
                </>
            )}
        </Carousel>
    )
}