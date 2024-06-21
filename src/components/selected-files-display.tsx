import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"

type SelectedFilesDisplayProps = {
    files: string[]
    onRemoveFile: (index: number) => void
}

export function SelectedFilesDisplay({ files, onRemoveFile }: SelectedFilesDisplayProps) {
    return (
        <div>
            {files.length == 1 && (
                <div className="relative h-[516px]">
                    <img
                        src={files[0]}
                        alt=""
                        className="rounded-lg object-cover size-full"
                    />

                    <Button
                        size="icon"
                        className="top-1 right-1 absolute bg-primary/90 rounded-full hover:text-gray-400 size-8"
                        onClick={() => onRemoveFile(0)}
                    >
                        <X />
                    </Button>
                </div>
            )}

            {files.length > 1 && (
                <Carousel className="w-full">
                    <CarouselContent>
                        {files.map((file, index) => (
                            <CarouselItem key={index} className="basis-1/2">
                                <div className="relative h-[290px]">
                                    <img
                                        src={file}
                                        className="rounded-lg object-cover size-full"
                                        alt=""
                                    />

                                    <Button
                                        size="icon"
                                        className="top-1 right-1 absolute bg-primary/90 rounded-full hover:text-gray-400 size-8"
                                        onClick={() => onRemoveFile(index)}
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
            )}
        </div>
    )
}