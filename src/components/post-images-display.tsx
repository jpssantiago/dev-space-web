import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"
import { StopPropagationItem } from "./stop-propagation-item"

type PostImagesDisplayProps = {
    files: string[]
}

export function PostImagesDisplay({ files }: PostImagesDisplayProps) {
    if (files.length == 0) return <></>

    if (files.length == 1) {
        return (
            <div className="w-full">
                <img
                    src={files[0]}
                    alt=""
                    className="border rounded max-w-[596px] max-h-[596px] object-cover size-full"
                />
            </div>
        )
    }

    return (
        <Carousel>
            <CarouselContent>
                {files.map((file, index) => (
                    <CarouselItem key={index} className="basis-1/2">
                        <div className="h-[290px]">
                            <img
                                src={file}
                                className="border rounded-lg object-cover size-full"
                                alt=""
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {files.length > 2 && (
                <>
                    <StopPropagationItem>
                        <CarouselPrevious className="border-0 bg-primary hover:bg-gray-700 text-white hover:text-gray-300 translate-x-8" />
                    </StopPropagationItem>

                    <StopPropagationItem>
                        <CarouselNext className="border-0 bg-primary hover:bg-gray-700 text-white hover:text-gray-300 -translate-x-8" />
                    </StopPropagationItem>
                </>
            )}
        </Carousel>
    )
}